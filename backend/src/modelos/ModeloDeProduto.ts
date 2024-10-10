import { modelOptions as opcaoDeModelo, getModelForClass, prop as propriedade } from '@typegoose/typegoose'

@opcaoDeModelo({ schemaOptions: { timestamps: true } })
export class Produto {
  public _id?: string
  
  @propriedade({ required: true })
  public nome!: string
  
  @propriedade({ required: true, unique: true })
  public slug!: string
  
  @propriedade({ required: true })
  public imagem!: string

  @propriedade({ required: true })
  public categoria!: string
  
  @propriedade({ required: true, default: 0 })
  public preco!: number

  @propriedade({ required: true, default: 0 })
  public emEstoque!: number
  
  @propriedade({ required: true })
  public marca!: string

  @propriedade({ required: true, default: 0 })
  public avaliacao!: number

  @propriedade({ required: true, default: 0 })
  public visualizacoes!: number

  @propriedade({ required: true })
  public descricao!: string

  @propriedade({ required: true })
  public proprietario!: string

  @propriedade({ required: true })
  public pix!: string

}

export const ModeloDeProduto = getModelForClass(Produto)
