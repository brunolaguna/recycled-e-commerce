import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { exemploDeProdutos, exemploDeUsuarios } from '../data'
import { ModeloDeProduto } from '../modelos/ModeloDeProduto'
import { ModeloDeUsuario } from '../modelos/ModeloDeUsuario'

export const rotaTeste = express.Router()

rotaTeste.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    await ModeloDeProduto.deleteMany({})
    const produtosCriado = await ModeloDeProduto.insertMany(exemploDeProdutos)

    await ModeloDeUsuario.deleteMany({})
    const UsuariosCriado = await ModeloDeUsuario.insertMany(exemploDeUsuarios)

    res.json({ produtosCriado, UsuariosCriado })
  })
)
