import express, { Request, Response } from 'express'
import { rotaChave } from './rotas/rotaChave'
import mongoose from 'mongoose'
import { rotaDePedido } from './rotas/rotaDePedido'
import dotenv from 'dotenv'
import { rotaDeProduto } from './rotas/rotaDeProduto'
import path /*como path*/ from 'path'
import cors from 'cors'
import { rotaDeUsuario } from './rotas/rotaDeUsuario'

dotenv.config()

const acessoMongoDB =
  process.env.MONGODB_URI_REMOTE || 'mongodb://localhost/reciclaOn'

mongoose.set('strictQuery', true)
mongoose
  .connect(acessoMongoDB)
  .then(() => {
    console.log('Conectado ao MongoDB')
  })
  .catch(() => {
    console.log('Erro ao conectar com o MongoDB')
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
app.use('/api/chaves', rotaChave)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`)
})