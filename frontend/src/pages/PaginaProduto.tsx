import { useContext } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Avaliacao from "../components/Avaliacao";
import { useGetDetalhesDeProdutosPorSlugQuery } from "../hooks/hookProduto";
import { Store } from "../Loja";
import { converteProdutoParaItemDeCarrinho, getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function PaginaProduto() 
{
  const params = useParams()
  const { slug } = params
  const {
    data: produto,
    carregando,
    erro,
  } = useGetDetalhesDeProdutosPorSlugQuery(slug!)

  const { estado, dispatch } = useContext(Store)
  const { carrinho } = estado

  const navigate = useNavigate()

  const handlerAdicionaAoCarrinho = () =>
  {
      const existeItem = carrinho.itemDeCarrinho.find((x) => x._id === produto!._id)
      const quantidade = existeItem ? existeItem.quantidade + 1 : 1
      if ( produto!.contagemEstoque < quantidade )
      {
          toast.warn('Desculpe, o produto não está disponível')
          return
      }
      dispatch({
          type: 'ADICIONAR_CARRINHO',
          payload: { ...converteProdutoParaItemDeCarrinho(produto!), quantidade },
      })
      toast.success('Produto adicionado ao carrinho')
      navigate('/carrinho')
  }

  return (
    carregando ? (
      <LoadingBox />
    ): erro ? (
      <MessageBox variant="danger">{getError(erro as ApiError)}</MessageBox>
    ) : !produto ? (
      <MessageBox variant="danger">Produto não encontrado...</MessageBox>
    ) :(
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
                  numVisualizacao={produto.visualizacao}  
                ></Avaliacao>
              </ListGroup.Item>
              <ListGroup.Item>Preço: R${produto.preco}</ListGroup.Item>
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
                      <Col>{
                        produto.contagemEstoque > 0 ? (
                          <Badge bg="success">Disponível</Badge>
                        ) : (
                          <Badge bg="danger">Indisponível</Badge>
                        )
                      }</Col>
                    </Row>
                  </ListGroup.Item>
                  {
                    produto.contagemEstoque > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={handlerAdicionaAoCarrinho} variant="primary">Adicionar ao carrinho</Button>
                        </div>
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
}