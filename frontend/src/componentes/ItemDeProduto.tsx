import { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Contexto } from '../Contexto'
import { ItemDeCarrinho } from '../types/Carrinho'
import { Produto } from '../types/Produto'
import { converteProdutoEmItemDeCarrinho } from '../utilidades'
import Avaliacao from './Avaliacao'

function ItemDeProduto({ produto }: { produto: Produto }) {
  const { estado, dispatch } = useContext(Contexto)
  const {
    carrinho: { itensDeCarrinho },
  } = estado

  
  const adicionarAoCarrinho = (item: ItemDeCarrinho) => {
    const existeItem = itensDeCarrinho.find((x) => x._id === produto._id)
    const quantidade = existeItem ? existeItem.quantidade + 1 : 1
    if (produto.emEstoque < quantidade) {
      alert('Desculpe. Produto indisponível.')
      return
    }
    dispatch({
      type: 'ADICIONAR_ITEM_AO_CARRINHO',
      payload: { ...item, quantidade },
    })
    toast.success('Produto adicionado ao carrinho')
  }
  
  const [height, setHeight] = useState<string>('auto')

  const handleHeightChange = () => {
    if (produto.nome === 'Cadeira de Criança') {
      setHeight('260px');
    } else {
      setHeight('auto');
    }
  };

  useEffect(() => {
    handleHeightChange();
  }, [produto.nome]);
  
  return (
    <Card>
      <Link to={`/produto/${produto.slug}`}>
        <img style={{height: height}} src={produto.imagem} className="card-img-top" alt={produto.nome} />
      </Link>
      <Card.Body>
        <Link to={`/produto/${produto.slug}`}>
          <Card.Title>{produto.nome}</Card.Title>
        </Link>
        <Avaliacao avaliacao={produto.avaliacao} visualizacoes={produto.visualizacoes} />
        <Card.Text>R${produto.preco}</Card.Text>
        {
          produto.emEstoque === 0 && window.location.pathname === '/' ? (
            <Button variant="light" disabled>
              Indisponível
            </Button>
          ) : window.location.pathname === '/' ? (
            <Button
              onClick={() => adicionarAoCarrinho(converteProdutoEmItemDeCarrinho(produto))}
            >
              Adicionar ao Carrinho
            </Button>
          ) : (
            <Link to={`/editarProduto/${produto._id}`}>
              <Button>Editar</Button>
            </Link>
          )
        }
      </Card.Body>
    </Card>
  )
}

export default ItemDeProduto
