import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function SignInDropDown({userInfo, onClick2}:{userInfo : any, onClick2 : React.MouseEventHandler})
{
    return(
        <div>
                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Olá, ${userInfo.nome}`}
                  >
                    <br />
                    <LinkContainer to="/perfil">
                      <NavDropdown.Item>Perfil de Usuário</NavDropdown.Item>
                    </LinkContainer>
                    <hr />
                    <LinkContainer to="/historicoDoPedido">
                      <NavDropdown.Item>Histórico de Pedido</NavDropdown.Item>
                    </LinkContainer>
                    <hr />
                    <LinkContainer to="/cadastrarProduto">
                      <NavDropdown.Item>Cadastrar Produto</NavDropdown.Item>
                    </LinkContainer>
                    <hr />
                    <LinkContainer to="/meusProdutos">
                      <NavDropdown.Item>Meu(s) Produto(s)</NavDropdown.Item>
                    </LinkContainer>
                    <hr />
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={onClick2}
                    >
                      {' '}
                      Sair{' '}
                    </Link>
                    <br />
                  </NavDropdown>
                ) : (
                  <NavDropdown className="header-link" title={`Entrar`}>
                    <LinkContainer to="/entrar">
                      <NavDropdown.Item>Entrar</NavDropdown.Item>
                    </LinkContainer>
                    <hr />
                    <LinkContainer to="/cadastrar">
                      <NavDropdown.Item>Cadastrar</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
        </div>
    )
}