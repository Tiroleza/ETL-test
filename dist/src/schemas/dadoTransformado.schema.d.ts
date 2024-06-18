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
import { Document } from "mongoose";
export type DadoTransformadoDocument = DadoTransformado & Document;
export declare class DadoTransformado {
    valorTransformado: string;
    createdAt: Date;
}
export declare const DadoTransformadoSchema: import("mongoose").Schema<DadoTransformado, import("mongoose").Model<DadoTransformado, any, any, any, Document<unknown, any, DadoTransformado> & DadoTransformado & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DadoTransformado, Document<unknown, {}, import("mongoose").FlatRecord<DadoTransformado>> & import("mongoose").FlatRecord<DadoTransformado> & {
    _id: import("mongoose").Types.ObjectId;
}>;
