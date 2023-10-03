import jwt from 'jsonwebtoken'
import { Usuario } from './modelos/modeloDeUsuario'

export const gerarToken = (usuario: Usuario) =>
{
    return jwt.sign(
        {
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            isAdmin: usuario.isAdmin,
        },
        process.env.JWT_SECRET || 'algosecreto',
        {
            expiresIn: '30d'
        }
    )
}