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
exports.EstacionamentoController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const criar_estacionamento_dto_1 = require("./dto/criar-estacionamento.dto");
let EstacionamentoController = class EstacionamentoController {
    constructor(estacionamentoService) {
        this.estacionamentoService = estacionamentoService;
    }
    async criar(criarEstacionamentoDto) {
        try {
            const estacionamento = await this.estacionamentoService.criarEstacionamento(criarEstacionamentoDto.placa);
            console.log('Placa registrada com sucesso:', estacionamento.placa);
            return estacionamento;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException('Erro ao registrar a placa', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async listarPlacas() {
        try {
            const placas = await this.estacionamentoService.listarEstacionamentos();
            return {
                message: 'Placas listadas com sucesso',
                data: placas,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Erro ao listar placas', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EstacionamentoController = EstacionamentoController;
__decorate([
    (0, common_1.Post)('/estacionamentos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criar_estacionamento_dto_1.PlacaDto]),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)('/listar-placas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "listarPlacas", null);
exports.EstacionamentoController = EstacionamentoController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [app_service_1.EstacionamentoService])
], EstacionamentoController);
//# sourceMappingURL=app.controller.js.map