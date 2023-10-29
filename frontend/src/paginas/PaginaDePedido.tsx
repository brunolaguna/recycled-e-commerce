import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { useContext, useEffect } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Carregando from '../componentes/Carregando'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'
import {
  useDetalhesDoPedidoQuery,
  usePaypalClientIdQuery,
  usePagamentoDoPedidoMutation,
} from '../hooks/hookPedido'
import { Contexto } from '../Contexto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'
import { usePedidoRealizadoMutation } from '../hooks/hookProduto'

export default function PaginaDePedido() {
  const { estado } = useContext(Contexto)
  const { infoDeUsuario } = estado

  const params = useParams()
  const { id: idDePedido } = params

  const {
    data: pedido,
    isLoading,
    error,
    refetch,
  } = useDetalhesDoPedidoQuery(idDePedido!)

  const { mutateAsync: pagarPedido, isLoading: carregandoPagamento } =
    usePagamentoDoPedidoMutation()

  const { mutateAsync: pedidoRealizado } = usePedidoRealizadoMutation()

  const testeDePagamento = async () => {
    await pagarPedido({ idDePedido: idDePedido! })

    refetch()
    
    toast.success('Pedido foi pago')
    for ( let i = 0; i < pedido?.itensDePedido.length!; i++ )
    {
      if(pedido)
      {
        const _id = pedido.itensDePedido[i]._id
        const quantidadeDoProduto = pedido.itensDePedido[i].emEstoque - pedido.itensDePedido[i].quantidade
        pedidoRealizado({
          _id,
          quantidadeDoProduto
        })
      }
    }
  }

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer()

  const { data: paypalConfig } = usePaypalClientIdQuery()

  useEffect(() => {
    if (paypalConfig && paypalConfig.IdDoCliente) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypalConfig!.IdDoCliente,
            currency: 'RS',
          },
        })
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        })
      }
      loadPaypalScript()
    }
  }, [paypalConfig])

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: pedido!.precoTotal.toString(),
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID
        })
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (detalhes) => {
        try {
          await pagarPedido({ idDePedido: idDePedido!, ...detalhes })
          refetch()
          toast.success('Pedido foi pago com sucesso!')
        } catch (err) {
          toast.error(getError(err as ApiError))
        }
      })
    },
    onError: (err) => {
      toast.error(getError(err as ApiError))
    },
  }

  return isLoading ? (
    <Carregando></Carregando>
  ) : error ? (
    <MensagemDeAlerta variant="danger">
      {getError(error as ApiError)}
    </MensagemDeAlerta>
  ) : !pedido ? (
    <MensagemDeAlerta variant="danger">Pedido Não Encontrado</MensagemDeAlerta>
  ) : (
    <div>
      <Helmet>
        <title>Pedido {idDePedido}</title>
      </Helmet>
      <h1 className="my-3">Pedido {idDePedido}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Enviar</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {pedido.enderecoDeEnvio.nomeCompleto}{' '}
                <br />
                <strong>Rua: </strong> {pedido.enderecoDeEnvio.endereco},
                {pedido.enderecoDeEnvio.cidade},{' '}
                {pedido.enderecoDeEnvio.codigoPostal}
              </Card.Text>
              {pedido.enviado ? (
                <MensagemDeAlerta variant="success">
                  Enviado em {pedido.enviadoEm}
                </MensagemDeAlerta>
              ) : (
                <MensagemDeAlerta variant="warning">
                  Não Enviado
                </MensagemDeAlerta>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pagamento</Card.Title>
              <Card.Text>
                <strong>Método:</strong> {pedido.metodoDePagamento}
              </Card.Text>
              {pedido.foiPago ? (
                <MensagemDeAlerta variant="success">
                  Pago em {pedido.pagoEm}
                </MensagemDeAlerta>
              ) : (
                <MensagemDeAlerta variant="warning">
                  Não foi Pago
                </MensagemDeAlerta>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Itens</Card.Title>
              <ListGroup variant="flush">
                {pedido.itensDePedido.map((item) => (
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Resumo do Pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Itens</Col>
                    <Col>R${pedido.precoDeItens.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {
                /**
                <ListGroup.Item>
                  <Row>
                    <Col>Frete</Col>
                    <Col>R${pedido.enderecoDeEnvio.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                 */
                }
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Preço Total</strong>
                    </Col>
                    <Col>
                      <strong>R${pedido.precoTotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!pedido.foiPago && (
                  <ListGroup.Item>
                    {isPending ? (
                      <Carregando />
                    ) : isRejected ? (
                      <MensagemDeAlerta variant="danger">
                        Erro ao realizar pagamento pelo PayPal
                      </MensagemDeAlerta>
                    ) : (
                      <div>
                        <PayPalButtons
                          {...paypalbuttonTransactionProps}
                        ></PayPalButtons>
                        <Button onClick={testeDePagamento}>
                          Teste de Pagamento
                        </Button>
                      </div>
                    )}
                    {carregandoPagamento && <Carregando></Carregando>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
