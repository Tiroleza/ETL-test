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
exports.EtlController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const dadoCriar_dto_1 = require("./schemas/dadoCriar.dto");
let EtlController = class EtlController {
    constructor(etlService) {
        this.etlService = etlService;
    }
    async criar(criarDadoDto) {
        try {
            const dado = await this.etlService.criarDado(criarDadoDto.valorOriginal);
            return dado;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.HttpException("Dado já cadastrado", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Erro ao registrar o dado", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async listarDadosTransformados() {
        const dados = await this.etlService.listarDadosTransformados();
        return dados;
    }
};
exports.EtlController = EtlController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dadoCriar_dto_1.CriarDadoDto]),
    __metadata("design:returntype", Promise)
], EtlController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)("listar-dados-transformados"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EtlController.prototype, "listarDadosTransformados", null);
exports.EtlController = EtlController = __decorate([
    (0, common_1.Controller)("dados"),
    __metadata("design:paramtypes", [app_service_1.EtlService])
], EtlController);
//# sourceMappingURL=app.controller.js.map