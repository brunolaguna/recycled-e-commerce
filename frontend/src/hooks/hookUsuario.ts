import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { InfoDeUsuario } from '../types/InfoDeUsuario'

export const useEntrarMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      senha,
    }: {
      email: string
      senha: string
    }) =>
      (
        await apiClient.post<InfoDeUsuario>(`api/usuarios/entrar`, {
          email,
          senha,
        })
      ).data,
  })

export const useCadastrarMutation = () =>
  useMutation({
    mutationFn: async ({
      nome,
      email,
      senha,
    }: {
      nome: string
      email: string
      senha: string
    }) =>
      (
        await apiClient.post<InfoDeUsuario>(`api/usuarios/cadastrar`, {
          nome,
          email,
          senha,
        })
      ).data,
  })

export const useAtualizarPerfilMutation = () =>
  useMutation({
    mutationFn: async ({
      nome,
      email,
      senha,
    }: {
      nome: string
      email: string
      senha: string
    }) =>
      (
        await apiClient.put<InfoDeUsuario>(`api/usuarios/perfil`, {
          nome,
          email,
          senha,
        })
      ).data,
  })
