import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { ItemDeCarrinho, EnderecoDeEnvio } from '../types/Carrinho'
import { Pedido } from '../types/Pedido'

export const useDetalhesDoPedidoQuery = (id: string) =>
  useQuery({
    queryKey: ['pedidos', id],
    queryFn: async () => (await apiClient.get<Pedido>(`api/pedidos/${id}`)).data,
  })

export const usePaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: async () =>
      (await apiClient.get<{ IdDoCliente: string }>(`/api/chaves/paypal`)).data,
  })

export const usePagamentoDoPedidoMutation = () =>
  useMutation({
    mutationFn: async (detalhes: { idDePedido: string }) =>
      (
        await apiClient.put<{ message: string; pedido: Pedido }>(
          `api/pedidos/${detalhes.idDePedido}/pagar`,
          detalhes
        )
      ).data,
  })

export const useCriarPedidoMutation = () =>
  useMutation({
    mutationFn: async (pedido: {
      itensDePedido: ItemDeCarrinho[]
      enderecoDeEnvio: EnderecoDeEnvio
      metodoDePagamento: string
      precoDeItens: number
      precoDeEnvio: number
      precoTotal: number
    }) =>
      (
        await apiClient.post<{ message: string; pedido: Pedido }>(
          `api/pedidos`,
          pedido,
        )
      ).data,
  })

export const useGetHistoricoPedidoQuery = () =>
  useQuery({
    queryKey: ['historico-pedido'],
    queryFn: async () =>
      (await apiClient.get<Pedido[]>(`/api/pedidos/meu`)).data,
  })
