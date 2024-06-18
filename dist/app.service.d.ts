/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from "mongoose";
import { Dado } from "./schemas/dado.schema";
import { DadoTransformado } from "./schemas/dadoTransformado.schema";
import { DadoTransformadoDto } from "./schemas/dadoTransformado.dto";
export declare class EtlService {
    private readonly dadoModel;
    private readonly dadoTransformadoModel;
    constructor(dadoModel: Model<Dado>, dadoTransformadoModel: Model<DadoTransformado>);
    criarDado(valorOriginal: string): Promise<Dado>;
    listarDadosTransformados(): Promise<DadoTransformadoDto[]>;
    realizarEtl(): Promise<void>;
}
