import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Usuario } from './modelos/ModeloDeUsuario'

export const gerarAccessToken = (usuario: Usuario) => {
  return jwt.sign(
    {
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      admin: usuario.admin,
    },
    process.env.JWT_SECRET || 'segredo',
    {
      expiresIn: '30d',
    }
  )
}

export const autenticado = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization) {
    const accessToken = authorization.slice(7, authorization.length)
    const decode = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || 'segredo'
    )
    req.usuario = decode as {
      _id: string
      nome: string
      email: string
      admin: boolean
      token: string
    }
    next()
  } else {
    res.status(401).json({ message: 'Sem Token' })
  }
}
