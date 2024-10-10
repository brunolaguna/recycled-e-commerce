import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Produto } from '../types/Produto'
import { AppState } from '../Contexto'
import { InfoDeUsuario } from '../types/InfoDeUsuario'

export const useGetProdutosQuery = (consulta: string | null | AppState) =>
  useQuery({
    queryKey: ['produtos', consulta ? consulta : ''],
    queryFn: async () => (await apiClient.get<Produto[]>(`api/produtos/${consulta}`)).data,
  })

export const usePostSearchProduct = () => /*Atencao*/
useMutation({
  mutationFn: async ({
    search_product
  }: {
    search_product : string
  }) =>
    (
      await apiClient.post(`api/produtos`, {
        search_product
      })
    ).data,
})

export const useGetDetalhesDoProdutoPorSlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['produtos', slug],
    queryFn: async () =>
      (await apiClient.get<Produto>(`api/produtos/slug/${slug}`)).data,
  })

export const useGetCategoriasQuery = () =>
  useQuery({
    queryKey: ['categorias'],
    queryFn: async () =>
      (await apiClient.get<[]>(`api/produtos/categorias`)).data,
  })

export const useGetMeusProdutosQuery = (proprietario: string, ) =>
useQuery({
  queryKey: ['produtos', proprietario],
  queryFn: async () => (await apiClient.get<Produto[]>(`api/produtos/proprietario/${proprietario}`)).data,
})

export const useCadastrarProdutoMutation = () =>
useMutation({
  mutationFn: async ({
    nome,
    slug,
    imagem,
    categoriaDoProduto,
    precoDoProduto,
    quantidadeDoProduto,
    marcaDoProduto,
    avaliacao,
    visualizacoes,
    descricaoDoProduto,
    proprietario,
    pix
  }: {
    nome : string
    slug : string
    imagem : string//File | undefined
    categoriaDoProduto : string
    precoDoProduto : number
    quantidadeDoProduto: number
    marcaDoProduto: string
    avaliacao : number
    visualizacoes : number
    descricaoDoProduto: string
    proprietario : string
    pix : string
  }) =>
    (
      await apiClient.post<InfoDeUsuario>(`api/produtos/cadastrarProduto`, {
        nome,
        slug,
        imagem,
        categoriaDoProduto,
        precoDoProduto,
        quantidadeDoProduto,
        marcaDoProduto,
        avaliacao,
        visualizacoes,
        descricaoDoProduto,
        proprietario,
        pix
      })
    ).data,
})

export const useEditarProdutoMutation = () =>
useMutation({
  mutationFn: async ({
    _id,
    nome,
    slug,
    imagem,
    categoriaDoProduto,
    precoDoProduto,
    quantidadeDoProduto,
    marcaDoProduto,
    descricaoDoProduto,
    proprietario
  }: {
    _id : string
    nome : string
    slug : string
    imagem : string//File | undefined
    categoriaDoProduto : string
    precoDoProduto : number
    quantidadeDoProduto: number
    marcaDoProduto: string
    descricaoDoProduto: string
    proprietario : string
  }) =>
    (
      await apiClient.put<InfoDeUsuario>(`api/produtos/editarProduto/${_id}`, {
        _id,
        nome,
        slug,
        imagem,
        categoriaDoProduto,
        precoDoProduto,
        quantidadeDoProduto,
        marcaDoProduto,
        descricaoDoProduto,
        proprietario
      })
    ).data,
})

export const usePedidoRealizadoMutation = () =>
useMutation({
  mutationFn: async ({
    _id,
    quantidadeDoProduto
  }: {
    _id : string
    quantidadeDoProduto: number
  }) =>
    (
      await apiClient.put<InfoDeUsuario>(`api/produtos/produtoComprado`, {
        _id,
        quantidadeDoProduto
      })
    ).data,
})