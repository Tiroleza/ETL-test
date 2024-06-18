import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cron } from "@nestjs/schedule";
import { Dado, DadoDocument } from "./schemas/dado.schema";
import {
  DadoTransformado,
  DadoTransformadoDocument,
} from "./schemas/dadoTransformado.schema";
import { DadoTransformadoDto } from "./schemas/dadoTransformado.dto";

@Injectable()
export class EtlService {
  constructor(
    @InjectModel(Dado.name) private dadoModel: Model<DadoDocument>,
    @InjectModel(DadoTransformado.name, "cluster2")
    private dadoTransformadoModel: Model<DadoTransformadoDocument>
  ) {}

  async criarDado(valorOriginal: string): Promise<Dado> {
    const novoDado = new this.dadoModel({ valorOriginal });
    return novoDado.save();
  }

  async listarDadosTransformados(): Promise<DadoTransformadoDto[]> {
    const dadosTransformados = await this.dadoTransformadoModel.find().exec();
    return dadosTransformados.map((dado) => ({
      valorTransformado: dado.valorTransformado,
    }));
  }

  @Cron("0 * * * *") // Executa a cada hora
  async realizarEtl() {
    const dados = await this.dadoModel.find().exec();
    const dadosTransformados = dados.map((dado) => {
      const valorOriginal = dado.valorOriginal;

      // Lógica de transformação dos dados (substituição de números por letras, lógica simples apenas pra mostrar o ETL funcionando)
      const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const valorTransformado = valorOriginal.replace(
        /\d/g,
        (numero) => letras[parseInt(numero) - 1]
      );

      return { valorTransformado };
    });

    await this.dadoTransformadoModel.insertMany(dadosTransformados);
  }
}
