import { EtlService } from "./app.service";
import { CriarDadoDto } from "./schemas/dadoCriar.dto";
import { DadoTransformadoDto } from "./schemas/dadoTransformado.dto";
export declare class EtlController {
    private readonly etlService;
    constructor(etlService: EtlService);
    criar(criarDadoDto: CriarDadoDto): Promise<import("./schemas/dado.schema").Dado>;
    listarDadosTransformados(): Promise<DadoTransformadoDto[]>;
}
