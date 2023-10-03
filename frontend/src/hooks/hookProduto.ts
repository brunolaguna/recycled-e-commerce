import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Produto } from "../types/Produto";

export const useGetProdutosQuery = () =>
    useQuery({
        queryKey: ['produtos'],
        queryFn: async () => (await apiClient.get<Produto[]>('api/produtos')).data,
    })

export const useGetDetalhesDeProdutosPorSlugQuery = (slug: string) =>
    useQuery({
        queryKey: ['produtos', slug],
        queryFn: async () => 
            (await apiClient.get<Produto>(`api/produtos/slug/${slug}`)).data,
    })