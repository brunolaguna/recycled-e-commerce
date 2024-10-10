import React, { useContext, useEffect, useState } from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useGetProdutosQuery } from '../hooks/hookProduto'
import { Contexto } from '../Contexto'

export default function SearchBox({/*{ sendDataToParent } : { sendDataToParent : Function }*/})
{
  const { estado: {searchProduct}, dispatch } = useContext(Contexto)
  //const navigate = useNavigate()
  const [consulta, setConsulta] = useState('')
  /*
  useEffect(() =>
  {
    sendDataToParent(consulta)
  }, [consulta])
  */
  useGetProdutosQuery(consulta)

  function shareData(data : string)
  {
    setConsulta(data)
    dispatch({
      type: 'SEARCH_PRODUCT',
      payload: data
    })
  }

  //const enviarForm = (e: React.FormEvent<HTMLFormElement>) => 
  //{
  //  e.preventDefault()
  //  navigate(`/search/${consulta}`)
  //  
  //  //sendDataToParent(consulta)
  //}
  return(
    <Form className="d-flex me-auto mr-100 w-25" style={{minWidth: "150px"}}>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Procurar..."
          onChange={(e) => shareData(e.target.value)}
        />
      </InputGroup>
    </Form>
  )
}