import React from "react"
import { Carrinho, ItemDeCarrinho } from "./types/Carrinho"

type EstadoApp = 
{
    modo: string
    carrinho: Carrinho
}

const estadoInicial: EstadoApp = 
{
    modo: localStorage.getItem('mode')
        ? localStorage.getItem('mode')!
        : window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    carrinho:
    {
        itemDeCarrinho: localStorage.getItem('ItemDeCarrinho')
            ? JSON.parse(localStorage.getItem('ItemDeCarrinho')!)
            : [],
        enderecoDeEnvio: localStorage.getItem('EnderecoDeEnvio')
            ? JSON.parse(localStorage.getItem('EnderecoDeEnvio')!)
            : {},
        metodoDePagamento: localStorage.getItem('metodoDePagamento')
            ? localStorage.getItem('metodoDePagamento')!
            : 'PayPal',
        precoDeItens: 0,
        precoDeEnvio: 0,
        precoTotal: 0
    }
}

type Acao = 
    | { type: 'MUDAR_MODO' }
    | { type: 'ADICIONAR_CARRINHO'; payload: ItemDeCarrinho }
    | { type: 'REMOVER_CARRINHO'; payload: ItemDeCarrinho }

function reducer(estado: EstadoApp, acao: Acao): EstadoApp {
    switch (acao.type) 
    {
        case 'MUDAR_MODO':
            return {...estado, modo: estado.modo === 'dark' ? 'light': 'dark' }
        case 'ADICIONAR_CARRINHO':
            const itemNovo = acao.payload
            const existeItem = estado.carrinho.itemDeCarrinho.find(
                (item: ItemDeCarrinho) => item._id === itemNovo._id
            )
            const itemDeCarrinho = existeItem
                ? estado.carrinho.itemDeCarrinho.map((item: ItemDeCarrinho) => 
                    item._id === existeItem._id ? itemNovo : item
                  )
                : [...estado.carrinho.itemDeCarrinho, itemNovo]

            localStorage.setItem('itemDeCarrinho', JSON.stringify(itemDeCarrinho))
            return {...estado, carrinho: { ...estado.carrinho, itemDeCarrinho }}
        case 'REMOVER_CARRINHO': {
            const itemDeCarrinho = estado.carrinho.itemDeCarrinho.filter(
                (item: ItemDeCarrinho) => item._id !== acao.payload._id
            )
            localStorage.setItem('itemDeCarrinhos', JSON.stringify(itemDeCarrinho))
            return { ...estado, carrinho: { ...estado.carrinho, itemDeCarrinho }}
        }
        default:
            return estado
    }
}
const defaultDispatch: React.Dispatch<Acao> = () => estadoInicial

const Store = React.createContext({
    estado: estadoInicial,
    dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>) 
{
    const [estado, dispatch] = React.useReducer<React.Reducer<EstadoApp, Acao>>(
        reducer,
        estadoInicial
    )
    return <Store.Provider value={{ estado, dispatch }} {...props} />
}

export { Store, StoreProvider }