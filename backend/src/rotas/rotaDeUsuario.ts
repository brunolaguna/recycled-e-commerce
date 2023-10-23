import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { Usuario, ModeloDeUsuario } from '../modelos/ModeloDeUsuario'
import { gerarAccessToken, autenticado } from '../utilidades'

export const rotaDeUsuario = express.Router()
// POST /api/usuarios/entrar
rotaDeUsuario.post(
  '/entrar',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const usuario = await ModeloDeUsuario.findOne({ email: req.body.email })
    if (usuario) {
      if (bcrypt.compareSync(req.body.senha, usuario.senha)) {
        res.json({
          _id: usuario._id,
          nome: usuario.nome,
          email: usuario.email,
          admin: usuario.admin,
          token: gerarAccessToken(usuario),
        })
        return
      }
    }
    res.status(401).json({ message: 'Email ou senha inválidos' })
  })
)

rotaDeUsuario.post(
  '/cadastrar',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const usuario = await ModeloDeUsuario.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha),
    } as Usuario)
    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      admin: usuario.admin,
      token: gerarAccessToken(usuario),
    })
  })
)

rotaDeUsuario.put(
  '/perfil',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const usuario = await ModeloDeUsuario.findById(req.usuario._id)
    if (usuario) {
      usuario.nome = req.body.nome || usuario.nome
      usuario.email = req.body.email || usuario.email
      if (req.body.senha) {
        usuario.senha = bcrypt.hashSync(req.body.senha, 8)
      }
      const usuarioAtualizado = await usuario.save()
      res.send({
        _id: usuarioAtualizado._id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        admin: usuarioAtualizado.admin,
        token: gerarAccessToken(usuarioAtualizado),
      })
      return
    }

    res.status(404).json({ message: 'Usuario não encontrado' })
  })
)
