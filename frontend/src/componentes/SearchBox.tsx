import React, { useState } from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
  const navigate = useNavigate()
  const [consulta, setConsulta] = useState('')
  const [contador, setContador] = useState(0);

  const enviarForm = (e: React.SyntheticEvent) => 
  {
    e.preventDefault()
    navigate(consulta ? `/search?consulta=${consulta}` : '/search')
  }
  return (
    <Form className="d-flex me-auto mr-100 w-25" onSubmit={enviarForm} style={{minWidth: "200px"}}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Procurar..."
          aria-label="Procurar..."
          aria-describedby="button-search"
          onChange={(e) => setConsulta(e.target.value)}
        ></FormControl>
      </InputGroup>
    </Form>
  )
}
