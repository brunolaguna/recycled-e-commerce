import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import Carregando from '../componentes/Carregando'
import MensagemDeAlerta from '../componentes/MensagemDeAlerta'
import { useGetHistoricoPedidoQuery } from '../hooks/hookPedido'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilidades'

export default function PaginaHistoricoDePedido() {
  const navigate = useNavigate()
  const { data: pedidos, isLoading, error } = useGetHistoricoPedidoQuery()

  return (
    <div>
      <Helmet>
        <title>Histórico de Pedido</title>
      </Helmet>

      <h1>Histórico de Pedido</h1>
      {isLoading ? (
        <Carregando></Carregando>
      ) : error ? (
        <MensagemDeAlerta variant="danger">
          {getError(error as ApiError)}
        </MensagemDeAlerta>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAGO</th>
              <th>ENVIADO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {pedidos!.map((pedido) => (
              <tr key={pedido._id}>
                <td>{pedido._id}</td>
                <td>{pedido.criadoEm.substring(0, 10)}</td>
                <td>{pedido.precoTotal.toFixed(2)}</td>
                <td>
                  {pedido.foiPago ? pedido.pagoEm.substring(0, 10) : 'Não'}
                </td>
                <td>
                  {pedido.enviado ? pedido.enviadoEm.substring(0, 10) : 'Não'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/pedido/${pedido._id}`)
                    }}
                  >
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
