import { Button, Card } from "react-bootstrap";
import { Produto } from "../types/Produto";
import { Link } from "react-router-dom";
import Avaliacao from "./Avaliacao";

function ItemProduto( { produto }: { produto: Produto } )
{
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
                <Card.Text>{produto.preco}</Card.Text>
                {produto.contagemEstoque === 0 ? 
                (
                    <Button variant="light">
                        Indisponivel
                    </Button>
                ) :
                (
                    <Button>Adicionar ao carrinho</Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default ItemProduto