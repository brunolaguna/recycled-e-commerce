export type ItemDeCarrinho = {
  imagem: string | undefined
  slug: string
  quantidade: number
  emEstoque: number
  preco: number
  _id: string
  nome: string
}

export type EnderecoDeEnvio = {
  nomeCompleto: string
  endereco: string
  cidade: string
  codigoPostal: string
}

export type Carrinho = {
  itensDeCarrinho: ItemDeCarrinho[]
  enderecoDeEnvio: EnderecoDeEnvio
  metodoDePagamento: string
  precoDeItens: number
  precoDeEnvio: number
  precoTotal: number
}
