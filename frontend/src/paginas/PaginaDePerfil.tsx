import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import Carregando from '../componentes/Carregando'
import { useAtualizarPerfilMutation } from '../hooks/hookUsuario'
import { Contexto } from '../Contexto'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'

export default function PaginaDePerfil() {
  const { estado, dispatch } = useContext(Contexto)
  const { infoDeUsuario } = estado
  const [nome, setNome] = useState(infoDeUsuario!.nome)
  const [email, setEmail] = useState(infoDeUsuario!.email)
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const { mutateAsync: atualizarPerfil, isLoading } =
    useAtualizarPerfilMutation()

  const enviarForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if (senha !== confirmarSenha) {
        toast.error('Senha incorreta')
        return
      }
      const data = await atualizarPerfil({
        nome,
        email,
        senha,
      })
      dispatch({ type: 'AUTENTICAR_USUARIO', payload: data })
      localStorage.setItem('infoDeUsuario', JSON.stringify(data))
      toast.success('Perfil atualizado com sucesso!')
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <div className="container small-container">
      <Helmet>
        <title>Perfil de Usuário</title>
      </Helmet>
      <h1 className="my-3">Perfil de Usuário</h1>
      <form onSubmit={enviarForm}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirma Senha</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Atualizar
          </Button>
          {isLoading && <Carregando></Carregando>}
        </div>
      </form>
    </div>
  )
}
