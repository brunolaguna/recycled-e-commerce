import { Col, Row } from 'react-bootstrap'
import { Produto } from '../types/Produto'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ItemProduto from '../components/ItemProduto'
import { produtosAmostra } from '../dado'
import { Helmet } from 'react-helmet-async'

type Estado = 
{
  produtos: Produto[],
  carregando: boolean,
  erro: string
}

type Acao =
  | { type: 'buscaRequisição' }
  | { 
      type: 'buscaSucesso' 
      payload: Produto[] 
    }
  | { type: 'buscaFalha'; payload: string }

const estadoInicial: Estado = 
{
    produtos: [],
    carregando: true,
    erro: '',
}

const reducer = (estado: Estado, acao: Acao) => {
  switch (acao.type) {
    case 'buscaRequisição':
      return { ...estado, carregando: true }
    case 'buscaSucesso':
      return { ...estado, products: acao.payload, carregando: false } 
    case 'buscaFalha':
      return { ...estado, carregando: false, erro: acao.payload }
    default:
      return estado
  }
}

export default function PaginaPrincipal() 
{
 const [{ carregando, erro, produtos }, dispatch] = useReducer<React.Reducer<Estado, Acao>>(reducer, estadoInicial)

 useEffect(() => 
 {
  const fetchData = async () =>
  {
    dispatch({ type: 'buscaRequisição' })
    try
    {
      const result = await axios.get('/api/produtos')
      dispatch({ type: 'buscaSucesso', payload: result.data })
    } 
    catch (err)
    {
      dispatch({ type: 'buscaFalha', payload: getError(err as ApiError) })
    }
  }
  fetchData()
 }, [])

  return (
    carregando ? (
    <LoadingBox />
    ) : erro ? (
      <MessageBox variant="danger">{erro}</MessageBox>
    ) : (
      <Row>
        <Helmet>
          <title>ReciclaOn</title>
        </Helmet>
        {
          produtosAmostra.map((produto) => (
            <Col key={produto.slug} sm={6} md={4} lg={3}>
              <ItemProduto produto={produto} />
            </Col>
          ))
        }
      </Row>
    )
  )
}
