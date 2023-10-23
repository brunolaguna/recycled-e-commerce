import { ItemDeCarrinho, EnderecoDeEnvio } from './Carrinho'
import { Usuario } from './Usuario'

export type Pedido = {
  _id: string
  itensDePedido: ItemDeCarrinho[]
  enderecoDeEnvio: EnderecoDeEnvio
  metodoDePagamento: string
  usuario: Usuario
  criadoEm: string
  foiPago: boolean
  pagoEm: string
  enviado: boolean
  enviadoEm: string
  precoDeItens: number
  precoDeEnvio: number
  precoTotal: number
}
