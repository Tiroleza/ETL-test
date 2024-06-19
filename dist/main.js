"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const etl_module_1 = require("./etl.module");
const bodyParser = require("body-parser");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(etl_module_1.EtlModule);
    app.use(bodyParser.json());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(3000);
    console.log("Aplicação está rodando na porta 3000.");
    const etlService = app.get(app_service_1.EtlService);
    await etlService.realizarEtl();
    setInterval(() => etlService.realizarEtl(), 10000);
}
bootstrap();
//# sourceMappingURL=main.js.map