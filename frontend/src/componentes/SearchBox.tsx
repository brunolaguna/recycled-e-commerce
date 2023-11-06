import React, { useState } from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SearchBox({ sendDataToParent } : { sendDataToParent : Function })
{
  const navigate = useNavigate()
  const [consulta, setConsulta] = useState('')

  const enviarForm = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    e.preventDefault()
    var query = e.target.value
    setConsulta(query)
    sendDataToParent(consulta)
  }
  return (

       <Form className="d-flex me-auto mr-100 w-25" style={{minWidth: "150px"}}>
         <InputGroup>
           <FormControl
             type="text"
             placeholder="Procurar..."
             onChange={enviarForm}
           />
         </InputGroup>
       </Form>

  )
}