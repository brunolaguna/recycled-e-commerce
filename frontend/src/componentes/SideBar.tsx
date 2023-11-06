import { Collapse, Nav, Navbar } from "react-bootstrap";
import ButtonMode from "./ButtonMode";
import SignInDropDown from "./SignInDropDown";
import { Link } from "react-router-dom";
import Carrinho from "./Carrinho";
import { useEffect, useRef, useState } from "react";

export default function Sidebar({userInfo, open, mode, carrinho, onClick, onClick2} : {userInfo : any, open : boolean, mode : string, carrinho : any, onClick : React.MouseEventHandler, onClick2 : React.MouseEventHandler})
{
    let [wasClicked, setWasClicked] = useState(false)
    const li_element = useRef(null)

    const [decision, setDecision] = useState<boolean>(false)
    /*
    useEffect(() => {
        if (open === true && wasClicked === true && decision === true) {
          setDecision(false);
          open = false
          wasClicked = false
          console.log('oi1');
        } else if (open === false) {
          setDecision(false);
          console.log('oi2');
        } else {
          setDecision(true);
          console.log('oi3');
        }
      }, [open, wasClicked, decision]);
    */

    console.log(decision)

    return (
        <Collapse in={open} dimension="width">
            <Navbar id="collapse" className="position-fixed z-1 h-auto text-white end-0 p-3 rounded-start-3" style={{backgroundColor: 'rgba(60, 129, 4, 0.932)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
                    <Nav className="flex-column h-100">
                        <h3><SignInDropDown userInfo={userInfo} onClick2={onClick2} /></h3>
                        <hr />
                        <ul className="list-unstyled components">
                            <li ref={li_element} onClick={() => (setWasClicked(true), setDecision(false))}>
                                <Link to="/historicoDoPedido" className="border-0 header-link">
                                    Pedidos
                                </Link>
                            </li>
                            <hr />
                            <li ref={li_element} onClick={() => (setWasClicked(true), setDecision(false))}>
                                <Link to="/sustentabilidade" className="border-0 header-link">
                                    Sustentabilidade
                                </Link>
                            </li>
                            <hr />
                            <li>
                                <ButtonMode 
                                mode={mode}
                                onClick={onClick}
                                />
                            </li>
                            <hr />
                        </ul>
                        <Carrinho carrinho={carrinho}/>
                    </Nav>
            </Navbar>
        </Collapse>
    );
}