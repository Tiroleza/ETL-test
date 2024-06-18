"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtlModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const dado_schema_1 = require("./schemas/dado.schema");
const dadoTransformado_schema_1 = require("./schemas/dadoTransformado.schema");
const database_module_1 = require("./database/database.module");
const schedule_1 = require("@nestjs/schedule");
let EtlModule = class EtlModule {
};
exports.EtlModule = EtlModule;
exports.EtlModule = EtlModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: dado_schema_1.Dado.name, schema: dado_schema_1.DadoSchema }], "cluster1"),
            mongoose_1.MongooseModule.forFeature([{ name: dadoTransformado_schema_1.DadoTransformado.name, schema: dadoTransformado_schema_1.DadoTransformadoSchema }], "cluster2"),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [app_controller_1.EtlController],
        providers: [app_service_1.EtlService],
    })
], EtlModule);
//# sourceMappingURL=etl.module.js.map