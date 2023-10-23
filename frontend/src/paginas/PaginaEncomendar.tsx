import { useContext, useEffect } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import VerificarPassos from '../componentes/ProcedimentoDeCompra'
import Carregando from '../componentes/Carregando'
import { useCriarPedidoMutation } from '../hooks/hookPedido'
import { Contexto } from '../Contexto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'

export default function PaginaEncomendar() {
  const navigate = useNavigate()

  const { estado, dispatch } = useContext(Contexto)
  const { carrinho, infoDeUsuario } = estado

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 => 123.23

  carrinho.precoDeItens = round2(
    carrinho.itensDeCarrinho.reduce((a, c) => a + c.quantidade * c.preco, 0)
  )
  carrinho.precoDeEnvio = carrinho.precoDeItens > 100 ? round2(0) : round2(10)
  carrinho.precoTotal = carrinho.precoDeItens + carrinho.precoDeEnvio

  const { mutateAsync: criarPedido, isLoading } = useCriarPedidoMutation()

  const encomendar_func = async () => {
    try {
      const data = await criarPedido({
        itensDePedido: carrinho.itensDeCarrinho,
        enderecoDeEnvio: carrinho.enderecoDeEnvio,
        metodoDePagamento: carrinho.metodoDePagamento,
        precoDeItens: carrinho.precoDeItens,
        precoDeEnvio: carrinho.precoDeEnvio,
        precoTotal: carrinho.precoTotal,
      })
      dispatch({ type: 'LIMPAR_CARRINHO' })
      localStorage.removeItem('itensDeCarrinho')
      navigate(`/pedido/${data.pedido._id}`)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  useEffect(() => {
    if (!carrinho.metodoDePagamento) {
      navigate('/pagamento')
    }
  }, [carrinho, navigate])

  return (
    <div>
      <VerificarPassos passo1 passo2 passo3 passo4></VerificarPassos>
      <Helmet>
        <title>Vizualizar Pedido</title>
      </Helmet>
      <h1 className="my-3">Vizualizar Pedido</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Enviar</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {carrinho.enderecoDeEnvio.nomeCompleto}{' '}
                <br />
                <strong>Endereço: </strong> {carrinho.enderecoDeEnvio.endereco},
                {carrinho.enderecoDeEnvio.cidade},{' '}
                {carrinho.enderecoDeEnvio.codigoPostal}
              </Card.Text>
              <Link to="/enviar">Editar</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pagamento</Card.Title>
              <Card.Text>
                <strong>Método:</strong> {carrinho.metodoDePagamento}
              </Card.Text>
              <Link to="/pagamento">Editar</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {carrinho.itensDeCarrinho.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="img-fluid rounded thumbnail"
                        ></img>{' '}
                        <Link to={`/produto/${item.slug}`}>{item.nome}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantidade}</span>
                      </Col>
                      <Col md={3}>${item.preco}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/carrinho">Editar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumo do Pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Itens</Col>
                    <Col>${carrinho.precoDeItens.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Envio</Col>
                    <Col>${carrinho.precoDeEnvio.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Preço Total</strong>
                    </Col>
                    <Col>
                      <strong>${carrinho.precoTotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={encomendar_func}
                      disabled={
                        carrinho.itensDeCarrinho.length === 0 || isLoading
                      }
                    >
                      Encomendar
                    </Button>
                    {isLoading && <Carregando></Carregando>}
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
