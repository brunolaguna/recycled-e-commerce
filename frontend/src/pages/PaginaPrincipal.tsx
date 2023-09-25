import { Col, Row } from 'react-bootstrap'
import { produtosAmostra } from '../dado'
import { Link } from 'react-router-dom'

export default function PaginaPrincipal() {
  return (
    <Row>
      {
        produtosAmostra.map((produto) => (
          <Col key={produto.slug} sm={6} md={4} lg={3}>
            <Link to={'/produto/' + produto.slug}>
              <h2>{produto.nome}</h2>
              <img 
                src={produto.imagem} 
                alt={produto.nome} 
                className='product-image'>  
              </img>
              <p>R${produto.preco}</p>
            </Link>
          </Col>
        ))
      }
    </Row>
  )
}
