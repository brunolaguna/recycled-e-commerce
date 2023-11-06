import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import Carregando from '../componentes/Carregando'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'
import ItemDeProduto from '../componentes/ItemDeProduto'
import { useGetProdutosQuery } from '../hooks/hookProduto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'
import SearchBox from '../componentes/SearchBox'

export default function PaginaInicial() 
{
  const { data: produtos, isLoading, error } = useGetProdutosQuery()
  
  /*
  const callBack = (data) =>
  {

  }
  */

  return isLoading ? (
    <Carregando />
  ) : error ? (
    <MensagemDeAlerta variant="danger">
      {getError(error as ApiError)}
    </MensagemDeAlerta>
  ) : (
    <Row>
      <Helmet>
        <title>ReciclaOn</title>
      </Helmet>
      {produtos!.map((produto) => (
        <Col key={produto.slug} sm={6} md={4} lg={3}>
          <ItemDeProduto produto={produto} />
        </Col>
      ))}
    </Row>
  )
}
