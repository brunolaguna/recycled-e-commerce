import { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import VerificarPassos from '../componentes/ProcedimentoDeCompra'
import { Contexto } from '../Contexto'

export default function PaginaMetodoDePagamento() {
  const navigate = useNavigate()
  const { estado, dispatch } = useContext(Contexto)
  const {
    carrinho: { enderecoDeEnvio, metodoDePagamento },
  } = estado

  const [nomeMetodoDePagamento, setNomeMetodoDePagamento] = useState(
    metodoDePagamento || 'PayPal'
  )
  useEffect(() => {
    if (!enderecoDeEnvio.endereco) {
      navigate('/enviar')
    }
  }, [enderecoDeEnvio, navigate])

  const enviarForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({
      type: 'SALVAR_METODO_DE_PAGAMENTO',
      payload: nomeMetodoDePagamento,
    })
    localStorage.setItem('metodoDePagamento', nomeMetodoDePagamento)
    navigate('/encomendar')
  }
  return (
    <div>
      <VerificarPassos passo1 passo2 passo3></VerificarPassos>
      <div className="container small-container">
        <Helmet>
          <title>Método de Pagamento</title>
        </Helmet>
        <h1 className="my-3">Método de Pagamento</h1>
        <Form onSubmit={enviarForm}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={nomeMetodoDePagamento === 'PayPal'}
              onChange={(e) => setNomeMetodoDePagamento(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={nomeMetodoDePagamento === 'Stripe'}
              onChange={(e) => setNomeMetodoDePagamento(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continuar</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
