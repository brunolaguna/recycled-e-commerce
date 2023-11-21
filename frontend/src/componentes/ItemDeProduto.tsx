import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Contexto } from '../Contexto'
import { ItemDeCarrinho } from '../types/Carrinho'
import { Produto } from '../types/Produto'
import { converteProdutoEmItemDeCarrinho } from '../utilidades'
import Avaliacao from './Avaliacao'

function ItemDeProduto({ produto }: { produto: Produto }) {
  const { estado, dispatch, estado: {modo} } = useContext(Contexto)
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

  const handleHeightChange = () => 
  {
    produto.imagem
    /*
    if (produto.nome === 'Cadeira de Criança') {
      setHeight('260px');
    } else {
      setHeight('auto');
    }
    */
  };

  /*
  const getImageHeight = (event : React.ChangeEvent<HTMLImageElement>) =>
  {
    console.log(event.target.naturalHeight)
    event.target.naturalHeight > 259
      ? setHeight("259px")
      : setHeight("auto")
  }
  
  useEffect(() => 
  {
    // You need to create a synthetic event to pass to getImageHeight
    const syntheticEvent = {
      target: new Image(), // create a dummy image element
    } as React.ChangeEvent<HTMLImageElement>;
      getImageHeight(syntheticEvent);
  }, [produto.nome]);
  */
 
  const [altura, setAltura] = useState(0)
  const [windowSize, setWindowSize] = useState(getWindowSize())

  function getWindowSize() 
  {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  useEffect(() => 
  {
    function handleWindowResize()
    {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)

    setAltura(cardRef.current ? cardRef.current.clientHeight : undefined)
    
    return () =>
    {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [windowSize, produto.nome])

  const cardRef = useRef<any>(null)
  
  return (
    <Card ref={cardRef} className={`${modo === 'claro' ? "bg-light" : "bg-dark"} mb-2`}>
      <Link to={`/produto/${produto.slug}`}>
        <img style={{height: "259px"}} src={produto.imagem} className="card-img-top object-fit-contain" alt={produto.nome} />
      </Link>
      <Card.Body className='p-3'>
        <Link to={`/produto/${produto.slug}`}>
          <Card.Title className={altura > 437 ? 'h6' : 'h5'}>{produto.nome}</Card.Title>
        </Link>
        <Avaliacao avaliacao={produto.avaliacao} visualizacoes={produto.visualizacoes} />
        <Card.Text>R${produto.preco}</Card.Text>
        <div style={{padding: "none"}}>
          {
            produto.emEstoque === 0 && window.location.pathname === '/' ? (
              <Button variant={modo === 'claro' ? "dark" : "light"} disabled>
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
        </div>
      </Card.Body>
    </Card>
  )
}
export default ItemDeProduto