import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Dado, DadoDocument } from "./schemas/dado.schema";
import {
  DadoTransformado,
  DadoTransformadoDocument,
} from "./schemas/dadoTransformado.schema";
import { DadoTransformadoDto } from "./schemas/dadoTransformado.dto";

interface DadoWithTransformed extends Dado {
  transformado: boolean;
}

@Injectable()
export class EtlService {
  private primeiroExecutado = false;

  constructor(
    @InjectModel(Dado.name, "cluster1")
    private readonly dadoModel: Model<DadoDocument & DadoWithTransformed>,
    @InjectModel(DadoTransformado.name, "cluster2")
    private readonly dadoTransformadoModel: Model<DadoTransformadoDocument>
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

  caesarCipher(str: string, shift: number): string {
    return str.toUpperCase().replace(/[A-Z]/g, (char) => {
      const start = 65; // Código ASCII para 'A'
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift) % 26) + start
      );
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async realizarEtl() {
    if (!this.primeiroExecutado) {
      // Executa apenas um dado na inicialização
      console.log("Iniciando processo ETL...");

      const dadoNaoTransformado = await this.dadoModel
        .findOne({
          transformado: { $ne: true }, // Encontra apenas dados não transformados
        })
        .exec();

      if (!dadoNaoTransformado) {
        console.log("Todos os dados do cluster 1 já foram transformados.");
        return;
      }

      const valorOriginal = dadoNaoTransformado.valorOriginal;
      const shift = 3; // Valor fixo de deslocamento
      const valorTransformado = this.caesarCipher(valorOriginal, shift);

      await new this.dadoTransformadoModel({
        valorOriginal,
        valorTransformado,
      }).save();

      // Marca o dado como transformado no cluster 1
      dadoNaoTransformado.transformado = true;
      await dadoNaoTransformado.save();

      console.log(
        `Dado original: ${valorOriginal} -> Dado transformado: ${valorTransformado}`
      );
      console.log("Dado transformado e armazenado no cluster 2.");

      this.primeiroExecutado = true; // Marca que o primeiro dado foi transformado
    } else {
      // Executa um dado por vez a cada hora
      console.log("Iniciando processo ETL...");

      const dadoNaoTransformado = await this.dadoModel
        .findOne({
          transformado: { $ne: true }, // Encontra apenas dados não transformados
        })
        .exec();

      if (!dadoNaoTransformado) {
        console.log("Todos os dados do cluster 1 já foram transformados.");
        return;
      }

      const valorOriginal = dadoNaoTransformado.valorOriginal;
      const shift = 3; // Valor fixo de deslocamento
      const valorTransformado = this.caesarCipher(valorOriginal, shift);

      await new this.dadoTransformadoModel({
        valorOriginal,
        valorTransformado,
      }).save();

      // Marca o dado como transformado no cluster 1
      dadoNaoTransformado.transformado = true;
      await dadoNaoTransformado.save();

      console.log(
        `Dado original: ${valorOriginal} -> Dado transformado: ${valorTransformado}`
      );
      console.log("Dado transformado e armazenado no cluster 2.");
    }
  }
}
