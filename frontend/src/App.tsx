import { useContext, useEffect, useRef, useState } from 'react'
import {
  Badge,
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Contexto } from './Contexto'
import { useGetCategoriasQuery } from './hooks/hookProduto'
import Carregando from './componentes/Carregando'
import MensagemDeAlerta from './componentes/MensagemDeAlerta'
import { getError } from './utilidades'
import { ApiError } from './types/ApiError'
import SearchBox from './componentes/SearchBox'
import { FiMenu } from 'react-icons/fi'
import Sidebar from './componentes/SideBar'
import ButtonMode from './componentes/ButtonMode'
import SignInDropDown from './componentes/SignInDropDown'
import Carrinho from './componentes/Carrinho'

function App() {
  const {
    estado: { modo, carrinho, infoDeUsuario },
    dispatch,
  } = useContext(Contexto)
  
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  
  const { data: categorias, isLoading, error } = useGetCategoriasQuery()
  
  const [open, setOpen] = useState(false)

  useEffect(() => 
  {
    document.querySelector('footer')!.className = ''
    document.body.className = ''
    document.body.classList.add(modo === 'claro' ? "bg-light" : "bg-dark")
    document.querySelector('footer')!.classList.add(modo === 'claro' ? "text-dark" : "text-light")
  }, [modo])

  const sideBar = useRef<HTMLDivElement>(null)
  const menuIcon = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutSideClick = (event : any) => {
      if (!sideBar.current?.contains(event.target) && !menuIcon.current?.contains(event.target)) {
        setOpen(false)
        console.log(open)
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [sideBar, menuIcon]);

  const mudarModo = () => {
    dispatch({ type: 'MUDAR_MODO' })
  }
  const sair = () => {
    dispatch({ type: 'USUARIO_SAIR' })
    localStorage.removeItem('infoDeUsuario')
    localStorage.removeItem('itensDeCarrinho')
    localStorage.removeItem('enderecoDeEnvio')
    localStorage.removeItem('metodoDePagamento')
    window.location.href = '/entrar'
  }

  const location = useLocation()
  const [backScreen, setBackScreen] = useState("ReciclaOn")

  useEffect(() =>
  {
    window.innerWidth < 768 && window.location.pathname !== '/'
      ? setBackScreen("⮜")
      : setBackScreen("ReciclaOn")
    
    console.log(backScreen)
  }, [location.pathname])
  

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3"
          expand="md"
        >
          <div className="d-flex justify-content-between align-items-center">
            <LinkContainer to="/" className="header-link">
              <Navbar.Brand>{backScreen}</Navbar.Brand>
            </LinkContainer>
            <SearchBox />

            <Navbar.Collapse className='d-lg-none'>
              <Nav className="w-100 justify-content-end flex-row">
                <ButtonMode 
                  mode={modo}
                  onClick={() => mudarModo()}
                />
                <SignInDropDown userInfo={infoDeUsuario} onClick2={() => sair()}/>
                <Link to="/historicoDoPedido" className="nav-link header-link">
                  Pedidos
                </Link>
                <Link to="/sustentabilidade" className="nav-link header-link">
                  Sustentabilidade
                </Link>
                <Carrinho carrinho={carrinho}/>
              </Nav>
            </Navbar.Collapse>
            <div ref={menuIcon}>
              <FiMenu 
                role='button' 
                className='d-md-none cursor-pointer' 
                color='white'
                size={40}
                onClick={() => open === false ? setOpen(true) : setOpen(false)}
                aria-controls='collapse'
                aria-expanded={open}
              />
            </div>
          </div>
          {
            /**          <div className="sub-header">
            <div className="d-flex" style={{ backgroundColor: 'green' }}>
              <Link
                to="#"
                className="nav-link header-link p-1"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i> Menu
              </Link>
              {['Oferta de Hoje', 'Presentes', 'À Venda'].map((x) => (
                <Link
                  key={x}
                  className="nav-link header-link p-1 px-3"
                  to={`/search?tag=${x}`}
                >
                  {x}
                </Link>
              ))}
            </div>
          </div> */
          }
        </Navbar>
        <div ref={sideBar}>
          <Sidebar
            userInfo={infoDeUsuario}
            open={open}
            mode={modo}
            onClick={() => mudarModo()}
            onClick2={() => sair()}
            carrinho={carrinho}
          />
        </div>
      </header>

      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}

      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user">
            <LinkContainer
              to={infoDeUsuario ? `/perfil` : `/entrar`}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <span>
                {infoDeUsuario ? `Olá, ${infoDeUsuario.nome}` : `Entrar`}
              </span>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Categorias</strong>
              <Button
                variant={modo}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <Carregando />
          ) : error ? (
            <MensagemDeAlerta variant="danger">
              {getError(error as ApiError)}
            </MensagemDeAlerta>
          ) : (
            categorias!.map((categoria) => (
              <ListGroup.Item action key={categoria}>
                <LinkContainer
                  to={{ pathname: '/search', search: `categoria=${categoria}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{categoria}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className={`text-center`}>Todos os direitos reservados</div>
      </footer>
    </div>
  )
}

export default App
