import { ApiError } from "./types/ApiError";
import { ItemDeCarrinho } from "./types/Carrinho";
import { Produto } from "./types/Produto";

export const getError = (error: ApiError) => 
{
    return error.response && error.response.data.message
        ? error.response.data.message
        : error.message
}

export const converteProdutoParaItemDeCarrinho = ( produto: Produto ): ItemDeCarrinho => {
    const itemDeCarrinho: ItemDeCarrinho =
    {
        _id: produto._id,
        nome: produto.nome,
        slug: produto.slug,
        imagem: produto.imagem,
        preco: produto.preco,
        contagemEstoque: produto.contagemEstoque,
        quantidade: 1,
    }
    return itemDeCarrinho
}