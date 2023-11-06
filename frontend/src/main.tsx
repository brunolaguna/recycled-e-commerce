import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App'
import './index.css'
import PaginaInicial from './paginas/PaginaInicial'
import PaginaDeProduto from './paginas/PaginaDeProduto'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ContextoProvider } from './Contexto'
import PaginaDeCarrinho from './paginas/PaginaDeCarrinho'
import PaginaEntrar from './paginas/PaginaEntrar'
import PaginaCadastrar from './paginas/PaginaCadastrar'
import PaginaEnviaAoEndereco from './paginas/PaginaEnviaAoEndereco'
import PaginaMetodoDePagamento from './paginas/PaginaMetodoDePagamento'
import RotaProtegida from './componentes/RotaProtegida'
import PaginaEncomendar from './paginas/PaginaEncomendar'
import PaginaDePedido from './paginas/PaginaDePedido'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import PaginaHistoricoDePedido from './paginas/PaginaHistoricoDePedido'
import PaginaDePerfil from './paginas/PaginaDePerfil'
import { PaginaCadastroDeProduto } from './paginas/PaginaCadastroDeProduto'
import { PaginaEditarProduto } from './paginas/PaginaEditarProduto'
import { PaginaMeusProdutos } from './paginas/PaginaMeusProdutos'
import { PaginaOqEhSust } from './paginas/PaginaOqEhSust'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<PaginaInicial />} />
      <Route path="produto/:slug" element={<PaginaDeProduto />} />
      <Route path="carrinho" element={<PaginaDeCarrinho />} />
      <Route path="entrar" element={<PaginaEntrar />} />
      <Route path="cadastrar" element={<PaginaCadastrar />} />
      <Route path="/sustentabilidade" element={<PaginaOqEhSust />} />
      <Route path="" element={<RotaProtegida />}>
        <Route path="enviar" element={<PaginaEnviaAoEndereco />} />
        <Route path="pagamento" element={<PaginaMetodoDePagamento />} />
        <Route path="encomendar" element={<PaginaEncomendar />} />
        <Route path="/pedido/:id" element={<PaginaDePedido />} />
        <Route path="/historicoDoPedido" element={<PaginaHistoricoDePedido />} />
        <Route path="/perfil" element={<PaginaDePerfil />} />
        <Route path="/cadastrarProduto" element={<PaginaCadastroDeProduto />} />
        <Route path="/editarProduto/:id" element={<PaginaEditarProduto />} />
        <Route path="/meusProdutos" element={<PaginaMeusProdutos />} />
      </Route>
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextoProvider>
      <PayPalScriptProvider options={{ 'client-id': 'sb' }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </ContextoProvider>
  </React.StrictMode>
)