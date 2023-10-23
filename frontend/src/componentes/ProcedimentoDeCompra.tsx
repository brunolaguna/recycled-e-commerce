import { Col, Row } from 'react-bootstrap'

export default function VerificarPassos(props: {
  passo1?: boolean
  passo2?: boolean
  passo3?: boolean
  passo4?: boolean
}) {
  return (
    <Row className="checkout-steps">
      <Col className={props.passo1 ? 'active' : ''}>Entrar</Col>
      <Col className={props.passo2 ? 'active' : ''}>Envio</Col>
      <Col className={props.passo3 ? 'active' : ''}>Pagamento</Col>
      <Col className={props.passo4 ? 'active' : ''}>Finalizar Pedido</Col>
    </Row>
  )
}
