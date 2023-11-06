import { Link } from "react-router-dom";

export default function ButtonMode({mode, onClick} : {mode : string, onClick : React.MouseEventHandler})
{
    return(
        <Link
          to="#"
          className="nav-link header-link"
          onClick={onClick}
        >
            <i
              className={mode === 'claro' ? 'fa fa-sun' : 'fa fa-moon'}
            ></i>{' '}
            {mode === 'claro' ? 'Claro' : 'Escuro'}
        </Link>
    )
}