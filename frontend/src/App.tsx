import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar className='navBar' variant='dark' expand="lg">
          <Container>
            <Navbar.Brand><b>Recycled-E-Commerce</b></Navbar.Brand>
          </Container>
          <Nav>
            <a href='/carrinho' className='nav-link'>Carrinho</a>
            <a href='/entrar' className='nav-link'>Entrar</a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className='text-center'>Todos os direitos são reservados</div>
      </footer>
    </div>
  )
}

export default App