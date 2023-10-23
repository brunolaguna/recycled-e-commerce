import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useGetMeusProdutosQuery } from "../hooks/hookProduto"
import { ApiError } from "../types/ApiError"
import { getError } from "../utilidades"
import { Row, Col } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import Carregando from "../componentes/Carregando"
import ItemDeProduto from "../componentes/ItemDeProduto"
import MensagemDeAlerta from "../componentes/MensagemDeAlerta"

export function PaginaMeusProdutos()
{
    const proprietario : string = JSON.parse(localStorage.getItem('infoDeUsuario')!).email
    const { data: produtos, isLoading, error } = useGetMeusProdutosQuery(proprietario)
    
    //const navigate = useNavigate()
    
    //const { search } = useLocation()
    //const redirectInUrl = new URLSearchParams(search).get('redireciona')
    //const redirect = redirectInUrl ? redirectInUrl : '/'

    //const [nome, setNome] = useState<string>('')
    //const [imagem, setImagem] = useState<string>('')
    //const [precoDoProduto, setPrecoDoProduto] = useState<number>(0)


    //useEffect(() =>
    //{
    //  setSlugDoProduto(nome.replaceAll(' ', '-'))
    //  console.log(slug)
    //  console.log(nome)
    //  console.log(imagem)
    //}, [nome])
    return isLoading ? (
        <Carregando />
      ) : error ? (
        <MensagemDeAlerta variant="danger">
          {getError(error as ApiError)}
        </MensagemDeAlerta>
      ) : proprietario === JSON.parse(localStorage.getItem('infoDeUsuario')!).email ? (
        <Row>
          <Helmet>
            <title>Meus Produtos</title>
          </Helmet>
          <h1>Meus Produtos</h1>
          {produtos!.map((produto) => (
            <Col key={produto._id} sm={6} md={4} lg={3}>
              <ItemDeProduto produto={produto} />
            </Col>
          ))}
        </Row>
      ) : console.log('Tratativa')
}