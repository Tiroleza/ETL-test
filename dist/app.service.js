"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const dado_schema_1 = require("./schemas/dado.schema");
const dadoTransformado_schema_1 = require("./schemas/dadoTransformado.schema");
let EtlService = class EtlService {
    constructor(dadoModel, dadoTransformadoModel) {
        this.dadoModel = dadoModel;
        this.dadoTransformadoModel = dadoTransformadoModel;
        this.etlExecutado = false;
    }
    async criarDado(valorOriginal) {
        const novoDado = new this.dadoModel({ valorOriginal });
        return novoDado.save();
    }
    async listarDadosTransformados() {
        const dadosTransformados = await this.dadoTransformadoModel.find().exec();
        return dadosTransformados.map((dado) => ({
            valorTransformado: dado.valorTransformado,
        }));
    }
    caesarCipher(str, shift) {
        return str.toUpperCase().replace(/[A-Z]/g, (char) => {
            const start = 65;
            return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
        });
    }
    async realizarEtl() {
        if (this.etlExecutado) {
            console.log("Já foi realizado um ETL nesta execução.");
            return;
        }
        console.log("Iniciando processo ETL...");
        const dadosNaoTransformados = await this.dadoModel
            .find({
            transformado: { $ne: true },
        })
            .exec();
        if (dadosNaoTransformados.length === 0) {
            console.log("Todos os dados do cluster 1 já foram transformados.");
            return;
        }
        for (const dado of dadosNaoTransformados) {
            const valorOriginal = dado.valorOriginal;
            const shift = 3;
            const valorTransformado = this.caesarCipher(valorOriginal, shift);
            await new this.dadoTransformadoModel({
                valorOriginal,
                valorTransformado,
            }).save();
            dado.transformado = true;
            await dado.save();
            console.log(`Dado original: ${valorOriginal} -> Dado transformado: ${valorTransformado}`);
            console.log("Dado transformado e armazenado no cluster 2.");
        }
        this.etlExecutado = true;
    }
};
exports.EtlService = EtlService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EtlService.prototype, "realizarEtl", null);
exports.EtlService = EtlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dado_schema_1.Dado.name, "cluster1")),
    __param(1, (0, mongoose_1.InjectModel)(dadoTransformado_schema_1.DadoTransformado.name, "cluster2")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EtlService);
//# sourceMappingURL=app.service.js.map