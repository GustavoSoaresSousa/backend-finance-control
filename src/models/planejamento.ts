import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Receitas {
  salario: number;
  outrasReceitas: number;
}
export interface Despesas {
  condominio: number;
  aluguel: number;
  transporte: number;
  alimentacao: number;
  luz: number;
  agua: number;
  internet: number;
  academia: number;
  saude: number;
  cartaoDeCredito: number;
  diarista: number;
  escola : number;
  emprestimo: number;
  celular: number;
  planoDeSaude: number;
  supermercado: number;
  outros: number;
}

export interface Lazer {
  alimentacao: number;
  assinaturasMensais: number;
  festasOuBares: number;
  hobbies: number;
  confraternizacao: number;
  outros: number;
}

export interface Investimentos {
  educacao: number;
  investimentos: number;
  reservaDeEmergencia: number;
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

export interface DemostracoesFinanceiras extends Document {
  receitas?: Receitas[]
  despesas?: Despesas[]
  lazer?: Lazer[]
  investimentos?: Investimentos[]
  mes: MES
}

const schema = new Schema<DemostracoesFinanceiras>(
  {
    receitas: { type: Array<Receitas>, require: true },
    despesas: { type: Array<Despesas>, require: true },
    lazer: { type: Array<Lazer>, require: false },
    investimentos: { type: Array<Investimentos>, require: false },
    mes: { type: String, enum: Object.values(MES), require: true, unique: true }
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

export const PlanejamentoModel: Model<DemostracoesFinanceiras> = mongoose.model('Planejamento', schema)


