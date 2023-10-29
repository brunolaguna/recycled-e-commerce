import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { Pedido, ModeloDePedido } from '../modelos/modeloDePedido'
import { Produto } from '../modelos/ModeloDeProduto'
import { autenticado } from '../utilidades'

export const rotaDePedido = express.Router()

rotaDePedido.get(
  '/meu',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pedidos = await ModeloDePedido.find({ usuario: req.usuario._id })
    res.json(pedidos)
  })
)

rotaDePedido.get(
  // /api/pedidos/:id
  '/:id',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pedido = await ModeloDePedido.findById(req.params.id)
    if (pedido) {
      res.json(pedido)
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' })
    }
  })
)

rotaDePedido.post(
  '/',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.body.itensDePedido.length === 0) {
      res.status(400).json({ message: 'Carrinho vazio' })
    } else {
      const pedidoCriado = await ModeloDePedido.create({
        itensDePedido: req.body.itensDePedido.map((x: Produto) => ({
          ...x,
          produto: x._id,
        })),
        enderecoDeEnvio: req.body.enderecoDeEnvio,
        metodoDePagamento: req.body.metodoDePagamento,
        precoDeItens: req.body.precoDeItens,
        precoDeEnvio: req.body.precoDeEnvio,
        precoTotal: req.body.precoTotal,
        usuario: req.usuario._id,
      } as Pedido)
      res
        .status(201)
        .json({ message: 'Pedido criado com sucesso!', pedido: pedidoCriado })
    }
  })
)

rotaDePedido.put(
  '/:id/pagar',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pedido = await ModeloDePedido.findById(req.params.id)

    if (pedido) {
      pedido.foiPago = true
      //pedido.pagoEm = new Date(Date.now())
      //const date = new Date()
      //const dia = date.getDate()
      //const mes = date.getMonth() + 1
      //const ano = date.getFullYear()
      //const hora = date.setHours(hours: date.getHours() + 3)
      //const minuto = date.getMinutes()
      //const segundo = date.getSeconds()
      //const milisegundos = date.getMilliseconds()

      const dataHora = new Date(Date.now());
      const opcoes : object = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const dataHoraBrasil = dataHora.toLocaleString('pt-BR', opcoes);

      pedido.pagoEm = dataHoraBrasil
      
      pedido.resultadoDePagamento = {
        IdDePagamento: req.body.id,
        status: req.body.status,
        tempoAtualizado: req.body.tempoAtualizado,
        enderecoDeEmail: req.body.enderecoDeEmail,
      }
      const pedidoAtualizado = await pedido.save()

      res.send({
        pedido: pedidoAtualizado,
        message: 'Pedido pago com sucesso!',
      })
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' })
    }
  })
)
