import { modelOptions as opcaoDeModelo, Ref, getModelForClass, prop as propriedade } from '@typegoose/typegoose'
import { Usuario } from './ModeloDeUsuario'
import { Produto } from './ModeloDeProduto'

class Item 
{
  @propriedade({ ref: Produto })
  public produto?: Ref<Produto>
  
  @propriedade({ required: true })
  public quantidade!: string

  @propriedade({ required: true })
  public nome!: string

  @propriedade({ required: true })
  public imagem!: number

  @propriedade({ required: true })
  public preco!: number

}

class EnderecoDeEnvio 
{ 
  @propriedade()
  public endereco?: string

  @propriedade()
  public cep?: string

  @propriedade()
  public cidade?: string
  
  @propriedade()
  public nomeCompleto?: string
}


class ResultadoDePagamento 
{
  @propriedade()
  public IdDePagamento!: string

  @propriedade()
  public status!: string

  @propriedade()
  public tempoAtualizado!: string

  @propriedade()
  public enderecoDeEmail!: string
}

@opcaoDeModelo({ schemaOptions: { timestamps: true } })
export class Pedido {
  public _id!: string

  @propriedade()
  public enderecoDeEnvio?: EnderecoDeEnvio

  @propriedade()
  public itensDePedido!: Item[]
  
  @propriedade()
  public resultadoDePagamento?: ResultadoDePagamento
  
  @propriedade({ ref: Usuario })
  public usuario?: Ref<Usuario>

  @propriedade({ required: true })
  public metodoDePagamento!: string

  @propriedade({ required: true, default: 0 })
  public precoDeItens!: number

  @propriedade({ required: true, default: 0 })
  public precoDeEnvio!: number

  @propriedade({ required: true, default: 0 })
  public precoTotal!: number

  @propriedade({ required: true, default: false })
  public foiPago!: boolean

  @propriedade()
  public pagoEm!: string

  @propriedade({ required: true, default: false })
  public enviadoEm!: boolean

  @propriedade()
  public entregueEm!: Date
}

export const ModeloDePedido = getModelForClass(Pedido)
