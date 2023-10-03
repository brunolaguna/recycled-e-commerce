import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose"

@modelOptions( { schemaOptions: { timestamps: true } } )

export class Produto
{
    public _id?: string

    @prop({ required: true })
    public nome!: string

    @prop({ required: true, unique: true })
    public slug!: string

    @prop({ required: true })
    public imagem!: string

    @prop({})
    public marca!: string

    @prop({ required: true })
    public categoria!: string

    @prop({ required: true })
    public subCategoria!: string

    @prop({ required: true })
    public descricao!: string

    @prop({ required: true, default: 0 })
    public preco!: number

    @prop({ required: true, default: 0 })
    public contagemEstoque!: number

    @prop({ required: true, default: 0 })
    public avaliacao!: number

    @prop({ required: true, default: 0 })
    public visualizacao!: number
}

export const ModeloDeProduto = getModelForClass(Produto)