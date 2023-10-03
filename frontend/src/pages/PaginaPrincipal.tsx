import { Col, Row } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ItemProduto from '../components/ItemProduto'
import { produtosAmostra } from '../dado'
import { Helmet } from 'react-helmet-async'
import { useGetProdutosQuery } from '../hooks/hookProduto'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'



export default function PaginaPrincipal() 
{
  const { data: produtos, carregando, erro } = useGetProdutosQuery()
  return (
    carregando! ? (
    <LoadingBox />
    ) : erro ? (
      <MessageBox variant="danger">{getError(erro as ApiError)}</MessageBox>
    ) : (
      <Row>
        <Helmet>
          <title>ReciclaOn</title>
        </Helmet>
        {
          produtosAmostra!.map((produto) => (
            <Col key={produto.slug} sm={6} md={4} lg={3}>
              <ItemProduto produto={produto} />
            </Col>
          ))
        }
      </Row>
    )
  )
}
