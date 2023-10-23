import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCadastrarMutation } from '../hooks/hookUsuario'
import { Contexto } from '../Contexto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'

export default function PaginaCadastrar() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redireciona')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const { estado, dispatch } = useContext(Contexto)
  const { infoDeUsuario } = estado

  useEffect(() => {
    if (infoDeUsuario) {
      navigate(redirect)
    }
  }, [navigate, redirect, infoDeUsuario])

  const { mutateAsync: cadastrar } = useCadastrarMutation()

  const enviarForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (senha !== confirmarSenha) {
      toast.error('Senha incorreta')
      return
    }
    try {
      const data = await cadastrar({
        nome,
        email,
        senha,
      })
      dispatch({ type: 'AUTENTICAR_USUARIO', payload: data })
      localStorage.setItem('infoDeUsuario', JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Cadastrar</title>
      </Helmet>
      <h1 className="my-3">Cadastrar</h1>
      <Form onSubmit={enviarForm}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control onChange={(e) => setNome(e.target.value)} required />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Cadastrar</Button>
        </div>

        <div className="mb-3">
          Já possuí uma conta?{' '}
          <Link to={`/entrar?redireciona=${redirect}`}>Entrar</Link>
        </div>
      </Form>
    </Container>
  )
}
