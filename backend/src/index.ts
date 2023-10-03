import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { rotaDeProduto } from './rotas/rotasDeProdutos'
import { seedRouter } from './rotas/seedRoute'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ReciclaOn'
console.log(MONGODB_URI)
mongoose.set('strictQuery', true)
mongoose
    .connect(MONGODB_URI)
    .then(() => 
    {
        console.log('Conectado no MongoDB')
    })
    .catch(() => 
    {
        console.log('Erro ao conectar no MongoDB')
    })

const app = express()

app.use
(
    cors
    ({
        credentials: true,
        origin: ['http://localhost:5173']
    })
)

app.use('/api/produtos', rotaDeProduto)
app.use('/api/seed', seedRouter)

const porta = 4000
app.listen(porta, () => 
{
    console.log(`Servidor iniciado no http://localhost:${porta}`)
})