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

    return isLoading ? (
        <Carregando />
      ) : error ? (
        <MensagemDeAlerta variant="danger">
          {getError(error as ApiError)}
        </MensagemDeAlerta>
      ) : (
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
      )
}