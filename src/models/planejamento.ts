import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Receitas {
  salario: number;
  outrasReceitas: number | null;
}
export interface Despesas {
  condominio: number | null;
  aluguel: number | null;
  transporte: number;
  alimentacao: number;
  luz: number;
  agua: number;
  internet: number;
  academia: number | null;
  saude: number | null;
  cartaoDeCredito: number | null;
  diarista: number | null;
  escola : number | null;
  emprestimo: number | null;
  celular: number | null;
  planoDeSaude: number | null;
  supermercado: number;
  outros: number | null;
}

export interface Lazer {
  alimentacao: number | null;
  assinaturasMensais: number | null;
  festasOuBares: number | null;
  hobbies: number | null;
  confraternizacao: number | null;
  outros: number | null;
}

export interface Investimentos {
  educacao: number | null;
  investimentos: number | null;
  reservaDeEmergencia: number | null;
}

export enum MES{
  janeiro = 'Janeiro',
  fevereiro = 'Fevereiro', 
  marco = 'Março', 
  abril = 'Abril',
  maio = 'Maio', 
  junho = 'Junho', 
  julho = 'Julho', 
  agosto = 'Agosto',
  setembro = 'Setembro',
  outubro = 'Outubro', 
  novembro = 'Novembro',
  dezembro = 'Dezembro'
}

export interface DemostracoesFinanceiras {
  _id?: string;
  receitas?: Receitas[]
  despesas?: Despesas[]
  lazer?: Lazer[]
  investimentos?: Investimentos[]
  mes: MES
  ano: number
}

const schema = new Schema(
  {
    receitas: { type: Array<Receitas>, require: true },
    despesas: { type: Array<Despesas>, require: true },
    lazer: { type: Array<Lazer>, require: false },
    investimentos: { type: Array<Investimentos>, require: false },
    mes: { type: String, enum: Object.values(MES), require: true, },
    ano: {type: Number, required: true }
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
)

interface IPlanejamento extends Omit<DemostracoesFinanceiras, '_id'>, Document {}
export const PlanejamentoModel: Model<IPlanejamento> = mongoose.model('Planejamento', schema)


