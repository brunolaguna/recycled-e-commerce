import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditarProdutoMutation, useGetMeusProdutosQuery } from "../hooks/hookProduto";
import { toast } from "react-toastify";
import { ApiError } from "../types/ApiError";
import { getError } from "../utilidades";

export function PaginaEditarProduto()
{
  const navigate = useNavigate()
  
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redireciona')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [_id, set_Id] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [slug, setSlugDoProduto] = useState<string>('')
  const [imagem, setImagem] = useState<string>('')
  const [categoriaDoProduto, setCategoriaDoProduto] = useState<string>('')
  const [precoDoProduto, setPrecoDoProduto] = useState<number>(0)
  const [quantidadeDoProduto, setQuantidadeDoProduto] = useState<number>(0)
  const [marcaDoProduto, setMarcaDoProduto] = useState<string>('')
  const [descricaoDoProduto, setDescricaoDoProduto] = useState<string>('')

  const proprietario : string = JSON.parse(localStorage.getItem('infoDeUsuario')!).email

  const { data: lista_de_produtos, isLoading, error } = useGetMeusProdutosQuery(
    JSON.parse(localStorage.getItem('infoDeUsuario')!).email
  );

  useEffect(() => 
  {
    if(!isLoading && !error && lista_de_produtos){
      for ( let i = 0; i < lista_de_produtos?.length!; i++ )
      {
        if (window.location.pathname.includes(lista_de_produtos[i]._id)) {
          set_Id(lista_de_produtos[i]._id);
          setNome(lista_de_produtos[i].nome);
          setImagem(lista_de_produtos[i].imagem);
          setCategoriaDoProduto(lista_de_produtos[i].categoria);
          setPrecoDoProduto(lista_de_produtos[i].preco);
          setQuantidadeDoProduto(lista_de_produtos[i].emEstoque);
          setMarcaDoProduto(lista_de_produtos[i].marca);
          setDescricaoDoProduto(lista_de_produtos[i].descricao);
          break; // Optionally, you can break out of the loop once a match is found
        }
      }
    }
  }, [lista_de_produtos, isLoading, error])

  useEffect(() =>
  {
    setSlugDoProduto(nome.replaceAll(' ', '-'))
  }, [nome])

  const { mutateAsync: editarProduto } = useEditarProdutoMutation()

  const enviarForm = async (e: React.SyntheticEvent) => 
  {
    e.preventDefault()
    try
    {
      const data = await editarProduto({
        _id,
        nome,
        slug,
        imagem,
        categoriaDoProduto,
        precoDoProduto,
        quantidadeDoProduto,
        marcaDoProduto,
        descricaoDoProduto,
        proprietario
      })
      console.log(data)
      //navigate('/editarProduto')
      toast.success('Produto atualizado com sucesso!')
      navigate('/')
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
            value={nome}
            onChange = {(e) => setNome(e.target.value)} 
            placeholder="Camiseta de Garrafa Pet"
          />
        </Form.Group>

        <Form.Label>Imagem</Form.Label>
        <Form.Group className="mb-3" controlId="imagem">
          <Form.Control
            value={imagem}
            onChange={(e) => setImagem(e.target.value)} //(e: React.ChangeEvent<HTMLInputElement>) => setimagem(e?.target?.files?.[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            value={categoriaDoProduto}
            type="text"
            required
            onChange={(e) => setCategoriaDoProduto(e.target.value)}
            placeholder="Roupas"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="preco">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            value={precoDoProduto}
            type="number"
            onChange={(e) => setPrecoDoProduto(parseInt(e.target.value))}
            required
            placeholder="49,90"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantidade">
          <Form.Label>Quantidade em Estoque</Form.Label>
          <Form.Control
            value={quantidadeDoProduto}
            type="number"
            onChange={(e) => setQuantidadeDoProduto(parseInt(e.target.value))}
            required
            placeholder="26"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="marca">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            value={marcaDoProduto}
            type="text"
            onChange={(e) => setMarcaDoProduto(e.target.value)}
            required
            placeholder="Nike"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            value={descricaoDoProduto}
            type="text"
            onChange={(e) => setDescricaoDoProduto(e.target.value)}
            required
            placeholder="Camiseta da Nike de Garrafa Pet"
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </Container>
  )
}