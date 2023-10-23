import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Contexto } from '../Contexto'

export default function RotaProtegida() {
  const {
    estado: { infoDeUsuario },
  } = useContext(Contexto)
  if (infoDeUsuario) {
    return <Outlet />
  } else {
    return <Navigate to="/entrar" />
  }
}
