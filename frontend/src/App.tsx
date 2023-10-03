import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Loja'

function App() 
{
  const { estado: { modo, carrinho }, dispatch } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', modo)
  }, [modo])

  const mudarModo = () => 
  {
    dispatch({ type: 'MUDAR_MODO' })
  }

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar className='navBar' variant='dark' expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand><b>ReciclaOn</b></Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={modo} onClick={mudarModo}>
              <i className={modo === 'light' ? 'fa fa-sun' : 'fa fa-moon'} />
            </Button>
            
            <a href='/entrar' className='nav-link'>Entrar</a>
            <Link to='/carrinho' className='nav-link'>
              Carrinho
              <Badge>
                {carrinho.itemDeCarrinho.reduce((a, c) => a + c.quantidade, 0)}
              </Badge>
            </Link>
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