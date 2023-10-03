import express from 'express'
import asyncHandler from 'express-async-handler'
import { ModeloDeProduto } from '../modelos/modeloDeProduto'

export const rotaDeProduto = express.Router()

// /api/produtos
rotaDeProduto.get(
    '/',
    asyncHandler( async ( req, res ) => {
        const produtos = await ModeloDeProduto.find()
        res.json(produtos)
    })
)

// /api/produtos/slug/cadeira-de-criança
rotaDeProduto.get(
    '/slug/:slug',
    asyncHandler( async ( req, res ) => {
        const produto = await ModeloDeProduto.findOne( { slug: req.params.slug } )
        if ( produto )
        {
            res.json( produto )
        }
        else
        {
            res.status(404).json( { message: 'Produto não encontrado' } )
        }
    })
)