import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import Carregando from '../componentes/Carregando'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'
import ItemDeProduto from '../componentes/ItemDeProduto'
import { useGetProdutosQuery } from '../hooks/hookProduto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'
import { useContext, useEffect } from 'react'
import { Contexto } from '../Contexto'

export default function PaginaInicial() 
{
  const {estado: {searchProduct}} = useContext(Contexto)
  console.log(searchProduct)
  const { data: produtos, isLoading, error } = useGetProdutosQuery(searchProduct)
  
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
      {produtos &&
        produtos.map((produto) => (
          <Col key={produto.slug} sm={6} md={4} lg={3}>
            <ItemDeProduto produto={produto}/>
          </Col>
        ))}
    </Row>
  )
}