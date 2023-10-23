import express, { Request, Response } from 'express'
import { rotaChave } from './rotas/rotaChave'
import mongoose from 'mongoose'
import { rotaDePedido } from './rotas/rotaDePedido'
import dotenv from 'dotenv'
import { rotaDeProduto } from './rotas/rotaDeProduto'
import path /*como path*/ from 'path'
import cors from 'cors'
import { rotaTeste } from './rotas/rotaTeste'
import { rotaDeUsuario } from './rotas/rotaDeUsuario'

dotenv.config()

const acessoMongoDB =
  process.env.MONGODB_URI || 'mongodb://localhost/reciclaOn'
mongoose.set('strictQuery', true)
mongoose
  .connect(acessoMongoDB)
  .then(() => {
    console.log('Conectado ao MongoDB')
  })
  .catch(() => {
    console.log('Erro ao conectar ao MongoDB')
  })

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/produtos', rotaDeProduto)
app.use('/api/usuarios', rotaDeUsuario)
app.use('/api/pedidos', rotaDePedido)
app.use('/api/teste', rotaTeste)
app.use('/api/chaves', rotaChave)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORTA: number = parseInt((process.env.PORTA || '4000') as string, 10)

app.listen(PORTA, () => {
  console.log(`Servidor iniciado em http://localhost:${PORTA}`)
})