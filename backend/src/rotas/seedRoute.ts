import express, { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import { ModeloDeProduto } from "../modelos/modeloDeProduto"
import { produtosAmostra, usuariosAmostra } from "../dado"
import { ModeloDeUsuario } from "../modelos/modeloDeUsuario"

export const seedRouter = express.Router()

seedRouter.get
(
    '/',
    asyncHandler(async (req: Request, res: Response) => 
    {
        await ModeloDeProduto.deleteMany({})
        const produtoCriado = await ModeloDeProduto.insertMany(produtosAmostra)

        await ModeloDeUsuario.deleteMany({})
        const usuarioCriado = await ModeloDeUsuario.insertMany(usuariosAmostra)

        res.json({ produtoCriado, usuarioCriado })
    })
)