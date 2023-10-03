export type ItemDeCarrinho = 
{
    imagem: string | undefined
    slug: string
    quantidade: number
    contagemEstoque: number
    preco: number
    _id: string
    nome: string
}

export type EnderecoDeEnvio = 
{
    fullName: string
    endereco: string
    cidade: string
    pais: string
    codigoPostal: string
}

export type Carrinho = 
{
    itemDeCarrinho: ItemDeCarrinho[]
    enderecoDeEnvio: EnderecoDeEnvio
    metodoDePagamento: string
    precoDeItens: number
    precoDeEnvio: number
    precoTotal: number
}