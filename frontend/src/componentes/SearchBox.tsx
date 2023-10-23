import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
  const navigate = useNavigate()
  const [consulta, setConsulta] = useState('')
  const [contador, setContador] = useState(0);
  const [posicao, setPosicao] = useState<"relative" | "absolute">('absolute');
  const [visibilidade, setVisibilidade] = useState<"visible" | "hidden">('hidden');

  const enviarForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    navigate(consulta ? `/search?consulta=${consulta}` : '/search')
  }

  const handleButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setContador(contador + 1);

    if (contador % 2 === 1) {
      setPosicao('absolute');
      setVisibilidade('hidden');
    } else {
      setPosicao('relative');
      setVisibilidade('visible');
    }
  };
  return (
    <Form className="flex-grow-1 d-flex me-auto" onSubmit={enviarForm}>
        <Button variant="outline-primary" type="submit" id="button-search" onClick={handleButtonClick}>
          <i className="fas fa-search"></i>
        </Button>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Procurar..."
          aria-label="Procurar..."
          aria-describedby="button-search"
          onChange={(e) => setConsulta(e.target.value)}
          style={{position: posicao, visibility: visibilidade}}
        ></FormControl>
      </InputGroup>
    </Form>
  )
}
