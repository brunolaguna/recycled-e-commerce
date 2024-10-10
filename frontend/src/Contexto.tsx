import React from 'react'
import { Carrinho, ItemDeCarrinho, EnderecoDeEnvio } from './types/Carrinho'
import { InfoDeUsuario } from './types/InfoDeUsuario'

export type AppState = {
  modo: string
  carrinho: Carrinho
  infoDeUsuario?: InfoDeUsuario
  searchProduct: string | AppState
}

const initialState: AppState = {
  infoDeUsuario: localStorage.getItem('infoDeUsuario')
    ? JSON.parse(localStorage.getItem('infoDeUsuario')!)
    : null,

  modo: localStorage.getItem('modo')
    ? localStorage.getItem('modo')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: escuro)').matches
    ? 'escuro'
    : 'claro',
  carrinho: {
    itensDeCarrinho: localStorage.getItem('itensDeCarrinho')
      ? JSON.parse(localStorage.getItem('itensDeCarrinho')!)
      : [],
    enderecoDeEnvio: localStorage.getItem('enderecoDeEnvio')
      ? JSON.parse(localStorage.getItem('enderecoDeEnvio')!)
      : {},
    metodoDePagamento: localStorage.getItem('metodoDePagamento')
      ? localStorage.getItem('metodoDePagamento')!
      : 'PayPal',
    precoDeItens: 0,
    precoDeEnvio: 0,
    precoTotal: 0,
  },
  searchProduct: ''
}

type Action =
  | { type: 'MUDAR_MODO' }
  | { type: 'ADICIONAR_ITEM_AO_CARRINHO'; payload: ItemDeCarrinho }
  | { type: 'REMOVER_ITEM_DO_CARRINHO'; payload: ItemDeCarrinho }
  | { type: 'LIMPAR_CARRINHO' }
  | { type: 'AUTENTICAR_USUARIO'; payload: InfoDeUsuario }
  | { type: 'USUARIO_SAIR' }
  | { type: 'SALVAR_ENDERECO_DE_ENVIO'; payload: EnderecoDeEnvio }
  | { type: 'SALVAR_METODO_DE_PAGAMENTO'; payload: string }
  | { type: 'SEARCH_PRODUCT'; payload: string | AppState }

function reducer(estado: AppState, action: Action): AppState {
  switch (action.type) 
  {
    case 'MUDAR_MODO':
      localStorage.setItem('modo', estado.modo === 'escuro' ? 'claro' : 'escuro')
      return { ...estado, modo: estado.modo === 'escuro' ? 'claro' : 'escuro' }
    case 'ADICIONAR_ITEM_AO_CARRINHO':
      const itemNovo = action.payload
      const existeItem = estado.carrinho.itensDeCarrinho.find(
        (item: ItemDeCarrinho) => item._id === itemNovo._id
      )
      const itensDeCarrinho = existeItem
        ? estado.carrinho.itensDeCarrinho.map((item: ItemDeCarrinho) =>
            item._id === existeItem._id ? itemNovo : item
          )
        : [...estado.carrinho.itensDeCarrinho, itemNovo]

      localStorage.setItem('itensDeCarrinho', JSON.stringify(itensDeCarrinho))

      return { ...estado, carrinho: { ...estado.carrinho, itensDeCarrinho } }

    case 'REMOVER_ITEM_DO_CARRINHO': {
      const itensDeCarrinho = estado.carrinho.itensDeCarrinho.filter(
        (item: ItemDeCarrinho) => item._id !== action.payload._id
      )
      localStorage.setItem('itensDeCarrinho', JSON.stringify(itensDeCarrinho))
      return { ...estado, carrinho: { ...estado.carrinho, itensDeCarrinho } }
    }
    case 'LIMPAR_CARRINHO':
      return { ...estado, carrinho: { ...estado.carrinho, itensDeCarrinho: [] } }

    case 'AUTENTICAR_USUARIO':
      return { ...estado, infoDeUsuario: action.payload }

    case 'USUARIO_SAIR':
      return {
        modo:
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'escuro'
            : 'claro',
        carrinho: {
          itensDeCarrinho: [],
          metodoDePagamento: 'PayPal',
          enderecoDeEnvio: {
            nomeCompleto: '',
            endereco: '',
            cidade: '',
            codigoPostal: '',
          },
          precoDeItens: 0,
          precoDeEnvio: 0,
          precoTotal: 0,
        },
        searchProduct: ''
      }
    case 'SALVAR_ENDERECO_DE_ENVIO':
      return {
        ...estado,
        carrinho: {
          ...estado.carrinho,
          enderecoDeEnvio: action.payload,
        },
      }
    case 'SALVAR_METODO_DE_PAGAMENTO':
      return {
        ...estado,
        carrinho: { ...estado.carrinho, metodoDePagamento: action.payload },
      }
    case 'SEARCH_PRODUCT':
      const searchProduct = action.payload
      //console.log(searchProduct)
      return {
        ...estado,
        searchProduct
      }
    default:
      return estado
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Contexto = React.createContext({
  estado: initialState,
  dispatch: defaultDispatch,
})

function ContextoProvider(props: React.PropsWithChildren<{}>) {
  const [estado, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Contexto.Provider value={{ estado, dispatch }} {...props} />
}

export { Contexto, ContextoProvider }
