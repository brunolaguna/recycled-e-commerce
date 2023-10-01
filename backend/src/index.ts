import cors from 'cors'
import express, { Request, Response } from 'express'
import { produtosAmostra } from './dado'

const app = express()

app.use
(
    cors
    ({
        credentials: true,
        origin: ['http://localhost:5173']
    })
)

app.get('/api/produtos', (req: Request, res: Response) => 
{
    res.json(produtosAmostra)
})

const porta = 4000
app.listen(porta, () => 
{
    console.log(`Servidor iniciado no http://localhost:${porta}`)
})