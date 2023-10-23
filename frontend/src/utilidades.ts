import { ApiError } from './types/ApiError'
import { ItemDeCarrinho } from './types/Carrinho'
import { Produto } from './types/Produto'

export const getError = (erro: ApiError) => {
  return erro.response && erro.response.data.message
    ? erro.response.data.message
    : erro.message
}

export const converteProdutoEmItemDeCarrinho = (produto: Produto): ItemDeCarrinho => {
  const itemDeCarrinho: ItemDeCarrinho = {
    _id: produto._id,
    nome: produto.nome,
    slug: produto.slug,
    imagem: produto.imagem,
    preco: produto.preco,
    emEstoque: produto.emEstoque,
    quantidade: 1,
  }
  return itemDeCarrinho
}
