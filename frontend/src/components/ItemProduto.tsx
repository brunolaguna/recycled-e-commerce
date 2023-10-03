import { useContext } from 'react'
import { Button, Card } from "react-bootstrap";
import { Produto } from "../types/Produto";
import { Link } from "react-router-dom";
import Avaliacao from "./Avaliacao";
import { Store } from "../Loja";
import { ItemDeCarrinho } from '../types/Carrinho';
import { converteProdutoParaItemDeCarrinho } from '../utils';
import { toast } from 'react-toastify'

function ItemProduto( { produto }: { produto: Produto } )
{
    const { estado, dispatch } = useContext(Store)
    const
    {
        carrinho: { itemDeCarrinho },
    } = estado

    const handlerAdicionaAoCarrinho = async (item: ItemDeCarrinho) =>
    {
        const existeItem = itemDeCarrinho.find((x) => x._id === produto._id)
        const quantidade = existeItem ? existeItem.quantidade + 1 : 1
        if ( produto.contagemEstoque < quantidade )
        {
            alert('Desculpe, o produto não está disponível')
            return
        }
        dispatch({
            type: 'ADICIONAR_CARRINHO',
            payload: { ...item, quantidade }
        })
        toast.success('Produto adicionado ao carrinho')
    }
    return(
        <Card>
            <Link to={`/produto/${produto.slug}`}>
                <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
            </Link>
            <Card.Body>
                <Link to={`/produto/${produto.slug}`}>
                    <Card.Title>{produto.nome}</Card.Title>
                </Link>
                <Avaliacao avaliacao={produto.avaliacao} numVisualizacao={produto.visualizacao} />
                <Card.Text>R${produto.preco}</Card.Text>
                {produto.contagemEstoque === 0 ? 
                (
                    <Button variant="light">
                        Indisponivel
                    </Button>
                ) :
                (
                    <Button onClick={() => handlerAdicionaAoCarrinho(converteProdutoParaItemDeCarrinho(produto))}>Adicionar ao carrinho</Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default ItemProduto