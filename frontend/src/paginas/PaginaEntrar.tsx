import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Carregando from '../componentes/Carregando'
import { useEntrarMutation } from '../hooks/hookUsuario'
import { Contexto } from '../Contexto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'
import correcaoToastify from '../componentes/correcaoToastify'

export default function PaginaEntrar() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redireciona')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const { estado, dispatch } = useContext(Contexto)
  const { infoDeUsuario } = estado

  const { mutateAsync: entrar, isLoading } = useEntrarMutation()

  const enviarForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await entrar({
        email,
        senha,
      })
      dispatch({ type: 'AUTENTICAR_USUARIO', payload: data })
      localStorage.setItem('infoDeUsuario', JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      correcaoToastify(err as ApiError)
    }
  }

  useEffect(() => {
    if (infoDeUsuario) {
      navigate(redirect)
    }
  }, [navigate, redirect, infoDeUsuario])

  return (
    <Container className="small-container">
      <Helmet>
        <title>Entrar</title>
      </Helmet>
      <h1 className="my-3">Entrar</h1>
      <Form onSubmit={enviarForm}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setSenha(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Entrar
          </Button>
          {isLoading && <Carregando />}
        </div>
        <div className="mb-3">
          Não possui perfil?{' '}
          <Link to={`/cadastrar?redireciona=${redirect}`}>Criar conta</Link>
        </div>
      </Form>
    </Container>
  )
}
