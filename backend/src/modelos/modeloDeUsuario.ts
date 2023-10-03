import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions( { schemaOptions: { timestamps: true } } )
export class Usuario
{
    public _id?: string
    @prop( { required: true } )
    public nome!: string
    @prop( { required: true, unique: true } )
    public email?: string
    @prop( { required: true } )
    public senha!: string
    @prop( { required: true, default: false} )
    public isAdmin!: boolean
}

export const ModeloDeUsuario = getModelForClass(Usuario)