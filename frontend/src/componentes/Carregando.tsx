import Spinner from 'react-bootstrap/Spinner'

export default function Carregando() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Carregando...</span>
    </Spinner>
  )
}
