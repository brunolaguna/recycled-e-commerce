import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import Carregando from '../componentes/Carregando'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'
import { useGetHistoricoPedidoQuery } from '../hooks/hookPedido'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'
import { useEffect, useRef, useState } from 'react'
import Rating from '../componentes/Rating'

export default function PaginaHistoricoDePedido() 
{
  
  const navigate = useNavigate()
  
  const { data: pedidos, isLoading, error } = useGetHistoricoPedidoQuery()
  
  const starRef = useRef(new Array())
  console.log(starRef)

  const [ratings, setRatings] = useState<boolean[][]>()
  const [rating, setRating] = useState([false, false, false, false, false])
  const [isClicked, setIsClicked] = useState<boolean[][]>();
  const [modal, setModal] = useState(false)
  
  //console.log(ratings)

  useEffect(() =>
  {
    setRatings(pedidos?.map(() => [false, false, false, false, false]))
    setIsClicked(pedidos?.map(() => [false, false, false, false, false]))
    //console.log(rating)
  }, [pedidos])

  const handleMouseOver = (index: number, indexStar: number, isHovered: boolean) => 
  {
    if(ratings)
    {
      if(Array.isArray(ratings))
      {
        //console.log(isHovered)
        var newRating = ratings[index].map((_, i) => i <= indexStar);
        ratings[index] = newRating
        //console.log(newRating)
        setRating(newRating);
        setIsClicked(pedidos?.map(() => [false, false, false, false, false]))
      }
    }
  };
  const handleMouseOut = (index: number) => 
  {
    if ( !isClicked![index].includes(true) )
    {
      setRating([false, false, false, false, false]);
      ratings![index] = [false, false, false, false, false]
    }
  };
  const [starIndex, setStarIndex] = useState(0)
  const clickOnStar = (index: number, indexStar: number) =>
  {
    /*
    if (!isClicked)
    {
      */
     var startClicked = ratings![index].map((_, i) => i <= indexStar);
     //setIsClicked(ratings?.map((_, index) => startClicked))
     isClicked![index] = ratings![index].map((_, i) => i <= indexStar)
      setRating(startClicked)
      //setIsClicked(startClicked)
      
      ratings![index] = startClicked
      //console.log(isClicked![index][indexStar])
      setModal(true)
      setStarIndex(index)

      //return startClicked
      //console.log(clickOnStar)
      /*
    } else {
      setIsClicked(false)
    }
    */
  }
  const getDataShowFromRatingComponent = (index: number, indexStar: number) =>
  {
    setModal(false)
    setRatings(pedidos?.map(() => [false, false, false, false, false]))
    setIsClicked(pedidos?.map(() => [false, false, false, false, false]))
  }

  //const starRefs = useRef<Record<number, React.RefObject<any>>>({})
//
  //const starBlock = pedidos?.map((pedido, index) => {
  //  starRefs.current[index] = useRef(null);
  //})
  
  

  return (
    <div>
      <Helmet>
        <title>Histórico de Pedido</title>
      </Helmet>

      <h1>Histórico de Pedido</h1>
      {isLoading ? (
        <Carregando></Carregando>
      ) : error ? (
        <MensagemDeAlerta variant="danger">
          {getError(error as ApiError)}
        </MensagemDeAlerta>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              {/*<th>DATA</th>*/}
              <th>TOTAL</th>
              <th>PAGO</th>
              <th>ENVIADO</th>
              <th>AÇÕES</th>
              <th>AVALIAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {
              pedidos!.map((pedido, index) => (
                <tr key={pedido._id}>
                  <td>{pedido._id}</td>
                  {/*<td>{pedido.createdAt}</td>  aTENÇÃO*/}
                  <td>{pedido.precoTotal.toFixed(2)}</td>
                  <td>
                    {pedido.foiPago ? pedido.pagoEm : 'Não'}
                  </td>
                  <td>
                    {pedido.enviado ? pedido.enviadoEm : 'Não'}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/pedido/${pedido._id}`)
                      }}
                    >
                      Detalhes
                    </Button>
                  </td>
                  <td>
                    <div key={index} ref={(element) => starRef.current.push(element)}>
                      {
                        ratings
                          ? ratings[index]?.map((isHovered, indexStar) =>
                          (
                            <i
                              key={indexStar}
                              onMouseOver={() => handleMouseOver(index, indexStar, isHovered)}
                              onMouseOut={() => handleMouseOut(index)}
                              onClick={() => clickOnStar(index, indexStar)}
                              className={
                                isClicked![index][indexStar]
                                  ? 'fas fa-star'
                                  : 'far fa-star'
                              }
                              style={isHovered ? {color:"gold"} : {color: "black"}}
                              role='button'
                            />             
                          )) : undefined
                      }
                    </div>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      )}
      <Rating onClick={modal} setOnclick={getDataShowFromRatingComponent} starRefs={starRef.current[starIndex]} />
    </div>
  )
}