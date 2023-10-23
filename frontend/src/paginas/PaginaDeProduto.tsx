import { useContext } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Carregando from '../componentes/Carregando'
import Avaliacao from '../componentes/Avaliacao'
import { useGetDetalhesDoProdutoPorSlugQuery } from '../hooks/hookProduto'
import { Contexto } from '../Contexto'
import { ApiError } from '../types/ApiError'
import { converteProdutoEmItemDeCarrinho, getError } from '../utilidades'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'

export default function PaginaDeProduto() {
  const params = useParams()
  const { slug } = params
  const {
    data: produto,
    isLoading,
    error,
  } = useGetDetalhesDoProdutoPorSlugQuery(slug!)

  const { estado, dispatch } = useContext(Contexto)
  const { carrinho } = estado

  const navigate = useNavigate()

  const adicionarAoCarrinho = () => {
    const existeItem = carrinho.itensDeCarrinho.find(
      (x) => x._id === produto!._id
    )
    const quantidade = existeItem ? existeItem.quantidade + 1 : 1
    if (produto!.emEstoque < quantidade) {
      toast.warn('Desculpe, produto indisponível')
      return
    }
    dispatch({
      type: 'ADICIONAR_ITEM_AO_CARRINHO',
      payload: { ...converteProdutoEmItemDeCarrinho(produto!), quantidade },
    })
    toast.success('Produto adicionado ao carrinho')
    navigate('/carrinho')
  }
  return isLoading ? (
    <Carregando />
  ) : error ? (
    <MensagemDeAlerta variant="danger">
      {getError(error as ApiError)}
    </MensagemDeAlerta>
  ) : !produto ? (
    <MensagemDeAlerta variant="danger">Produto Não Encontrado</MensagemDeAlerta>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={produto.imagem} alt={produto.nome}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{produto.nome}</title>
              </Helmet>
              <h1>{produto.nome}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Avaliacao
                avaliacao={produto.avaliacao}
                visualizacoes={produto.visualizacoes}
              ></Avaliacao>
            </ListGroup.Item>
            <ListGroup.Item>Preço : R${produto.preco}</ListGroup.Item>
            <ListGroup.Item>
              Descrição:
              <p>{produto.descricao}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Preço:</Col>
                    <Col>R${produto.preco}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {produto.emEstoque > 0 ? (
                        <Badge bg="success">Disponível</Badge>
                      ) : (
                        <Badge bg="danger">Indisponível</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {produto.emEstoque > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={adicionarAoCarrinho} variant="primary">
                        Adicionar ao Carrinho
                      </Button>
                    </div>
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
