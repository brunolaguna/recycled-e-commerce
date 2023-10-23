import { modelOptions as opcaoDeModelo, getModelForClass, prop as propriedade } from '@typegoose/typegoose'

@opcaoDeModelo({ schemaOptions: { timestamps: true } })
export class Usuario {
  public _id?: string
  @propriedade({ required: true, default: false })
  public admin!: boolean
  @propriedade({ required: true })
  public nome!: string
  @propriedade({ required: true, unique: true })
  public email!: string
  @propriedade({ required: true })
  public senha!: string
}

export const ModeloDeUsuario = getModelForClass(Usuario)
