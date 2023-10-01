import { Helmet } from "react-helmet-async";
import { produtosAmostra } from "../dado";

export default function PaginaProduto() {
  return (
    <div>
      <Helmet>
        {
          produtosAmostra.map((produto) => (
            <title>ReciclaOn - {produto.nome}</title>
          ))
        }
      </Helmet>
      PaginaProduto
    </div>
  )
}
