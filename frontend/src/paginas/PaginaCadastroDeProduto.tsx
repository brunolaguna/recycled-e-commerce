import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { useCadastrarProdutoMutation, useEditarProdutoMutation } from "../hooks/hookProduto";
import { toast } from "react-toastify";
import { ApiError } from "../types/ApiError";
import { getError } from "../utilidades";

export function PaginaCadastroDeProduto()
{
  const navigate = useNavigate()
  
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redireciona')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [nome, setNome] = useState<string>('')
  const [slug, setSlugDoProduto] = useState<string>('')
  const [imagem, setImagem] = useState<string>('')
  const [categoriaDoProduto, setCategoriaDoProduto] = useState<string>('')
  const [precoDoProduto, setPrecoDoProduto] = useState<number>(0)
  const [quantidadeDoProduto, setQuantidadeDoProduto] = useState<number>(0)
  const [marcaDoProduto, setMarcaDoProduto] = useState<string>('')
  const [descricaoDoProduto, setDescricaoDoProduto] = useState<string>('')

  const avaliacao : number = 0
  const visualizacoes : number = 0
  const proprietario : string = JSON.parse(localStorage.getItem('infoDeUsuario')!).email

  useEffect(() =>
  {
    setSlugDoProduto(nome.replaceAll(' ', '-'))
    console.log(slug)
    console.log(nome)
    console.log(imagem)
    console.log(proprietario)
  }, [nome])

  const { mutateAsync: cadastrarProduto } = useCadastrarProdutoMutation()

  const enviarForm = async (e: React.SyntheticEvent) => 
  {
    e.preventDefault()
    try 
    {
      const data = cadastrarProduto({
        nome,
        slug,
        imagem,
        categoriaDoProduto,
        precoDoProduto,
        quantidadeDoProduto,
        marcaDoProduto,
        avaliacao,
        visualizacoes,
        descricaoDoProduto,
        proprietario
      })
      console.log(data)
      navigate('/editarProdutos')
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Vender Produto</title>
      </Helmet>
      <h1 className="my-3">Vender Produto</h1>
      <Form onSubmit={enviarForm}>
        <Form.Label>Nome</Form.Label>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Control
            onChange = {(e) => setNome(e.target.value)} 
            placeholder="Camiseta de Garrafa Pet"
          />
        </Form.Group>

        <Form.Label>Imagem</Form.Label>
        <Form.Group className="mb-3" controlId="imagem">
          <Form.Control
            onChange={(e) => setImagem(e.target.value)} //(e: React.ChangeEvent<HTMLInputElement>) => setimagem(e?.target?.files?.[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setCategoriaDoProduto(e.target.value)}
            placeholder="Roupas"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="preco">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setPrecoDoProduto(parseInt(e.target.value))}
            required
            placeholder="49,90"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantidade">
          <Form.Label>Quantidade em Estoque</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setQuantidadeDoProduto(parseInt(e.target.value))}
            required
            placeholder="26"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="marca">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setMarcaDoProduto(e.target.value)}
            required
            placeholder="Nike"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setDescricaoDoProduto(e.target.value)}
            required
            placeholder="Camiseta da Nike de Garrafa Pet"
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Adicionar Produto</Button>
        </div>
      </Form>
    </Container>
  )
}