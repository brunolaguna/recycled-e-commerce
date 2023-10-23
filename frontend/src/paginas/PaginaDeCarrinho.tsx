import { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'
import { Contexto } from '../Contexto'
import { ItemDeCarrinho } from '../types/Carrinho'

export default function PaginaDoCarrinho() {
  const navigate = useNavigate()

  const {
    estado: {
      modo,
      carrinho: { itensDeCarrinho },
    },
    dispatch,
  } = useContext(Contexto)

  const atualizarCarrinho = (item: ItemDeCarrinho, quantidade: number) => {
    if (item.emEstoque < quantidade) {
      toast.warn('Desculpe, produto indisponível')
      return
    }
    dispatch({
      type: 'ADICIONAR_ITEM_AO_CARRINHO',
      payload: { ...item, quantidade },
    })
  }
  const checkoutHandler = () => {
    /**AQUI */
    navigate('/entrar?redireciona=/enviar')
  }
  const removerItemHandler = (item: ItemDeCarrinho) => {
    dispatch({ type: 'REMOVER_ITEM_DO_CARRINHO', payload: item })
  }

  return (
    <div>
      <Helmet>
        <title>Página do Carrinho</title>
      </Helmet>
      <h1>Página do Carrinho</h1>
      <Row>
        <Col md={8}>
          {itensDeCarrinho.length === 0 ? (
            <MensagemDeAlerta>
              Carrinho Vazio. <Link to="/">Adicione itens ao carrinho</Link>
            </MensagemDeAlerta>
          ) : (
            <ListGroup>
              {itensDeCarrinho.map((item: ItemDeCarrinho) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="img-fluid rounded thumbnail"
                      ></img>{' '}
                      <Link to={`/produto/${item.slug}`}>{item.nome}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          atualizarCarrinho(item, item.quantidade - 1)
                        }
                        variant={modo}
                        disabled={item.quantidade === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantidade}</span>
                      <Button
                        variant={modo}
                        onClick={() =>
                          atualizarCarrinho(item, item.quantidade + 1)
                        }
                        disabled={item.quantidade === item.emEstoque}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>R${item.preco}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removerItemHandler(item)}
                        variant={modo}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {itensDeCarrinho.reduce((a, c) => a + c.quantidade, 0)}{' '}
                    items) : R$
                    {itensDeCarrinho.reduce(
                      (a, c) => a + c.preco * c.quantidade,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={itensDeCarrinho.length === 0}
                    >
                      Pagamento
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
