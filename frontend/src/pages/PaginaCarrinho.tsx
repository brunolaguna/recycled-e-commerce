import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Loja";
import { ItemDeCarrinho } from "../types/Carrinho";
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import { useContext } from "react";

export default function PaginaDoCarrinho()
{
    const navigate = useNavigate()

    const 
    {
        estado: 
        {
            modo,
            carrinho: { itemDeCarrinho },
        },
        dispatch,
    } = useContext(Store)

    const handlerAtualizaCarrinho = (item: ItemDeCarrinho, quantidade: number) =>
    {
        if ( item.contagemEstoque < quantidade)
        {
            toast.warn('Desculpe, o produto não está disponível')
            return
        }
        dispatch({
            type: 'ADICIONAR_CARRINHO',
            payload: { ...item, quantidade }
        })
    }
    const finalizarCompra = () =>
    {
        navigate('/entrar?redireciona=/envio')
    }
    const removeProduto = (item: ItemDeCarrinho) =>
    {
        dispatch({ type: 'REMOVER_CARRINHO', payload: item })
    }
    return(
        <div>
            <Helmet>
                <title>Meu Carrinho</title>
            </Helmet>
            <h1>Meu Carrinho</h1>
            <Row>
                <Col md={8}>
                    {itemDeCarrinho.length === 0 ? (
                        <MessageBox>
                            Carrinho vazio. <Link to="/">Adicione um item</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {itemDeCarrinho.map((item: ItemDeCarrinho) => (
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
                                                    handlerAtualizaCarrinho(item, item.quantidade - 1)
                                                }
                                                variant={modo}
                                                disabled={item.quantidade === 1}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span>{item.quantidade}</span>
                                            <Button
                                                onClick={() =>
                                                    handlerAtualizaCarrinho(item, item.quantidade + 1)
                                                }
                                                variant={modo}
                                                disabled={item.quantidade === item.contagemEstoque}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>R${item.preco}</Col>
                                        <Col md={2}>
                                            <Button onClick={() => removeProduto(item)} variant={modo}>
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
                                        Subtotal ({itemDeCarrinho.reduce((a, c) => a + c.quantidade, 0)}{' '}
                                        items) : R$
                                        {itemDeCarrinho.reduce((a, c) => a + c.preco * c.quantidade, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={finalizarCompra}
                                            disabled={itemDeCarrinho.length === 0}
                                        >
                                            Finalizar compra
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