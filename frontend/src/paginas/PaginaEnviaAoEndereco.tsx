import { ReactNode, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import VerificaPassos from '../componentes/ProcedimentoDeCompra'
import { Contexto } from '../Contexto'

export default function PaginaEnviaAoEndereco() {
  const navigate = useNavigate()
  const { estado, dispatch } = useContext(Contexto)
  const {
    infoDeUsuario,
    carrinho: { enderecoDeEnvio },
  } = estado

  useEffect(() => {
    if (!infoDeUsuario) {
      navigate('/entrar?redireciona=/enviar')
    }
  }, [infoDeUsuario, navigate])

  const [nomeCompleto, setNomeCompleto] = useState(
    enderecoDeEnvio.nomeCompleto || ''
  )
  const [endereco, setEndereco] = useState(enderecoDeEnvio.endereco || '')
  const [cidade, setCidade] = useState(enderecoDeEnvio.cidade || '')
  const [codigoPostal, setCodigoPostal] = useState(
    enderecoDeEnvio.codigoPostal || ''
  )

  const enviarForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({
      type: 'SALVAR_ENDERECO_DE_ENVIO',
      payload: {
        nomeCompleto,
        endereco,
        cidade,
        codigoPostal
      },
    })
    localStorage.setItem(
      'enderecoDeEnvio',
      JSON.stringify({
        nomeCompleto,
        endereco,
        cidade,
        codigoPostal,
      })
    )

    navigate('/pagamento')
  }

  return (
    <div>
      <Helmet>
        <title>Endereço de Envio</title>
      </Helmet>
      <VerificaPassos passo1 passo2></VerificaPassos>
      <div className="container small-container">
        <h1 className="my-3">Endereço de Envio</h1>
        <Form onSubmit={enviarForm}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continuar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
