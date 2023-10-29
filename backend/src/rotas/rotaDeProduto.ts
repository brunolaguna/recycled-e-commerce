import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { ModeloDeProduto, Produto } from '../modelos/ModeloDeProduto'
import { autenticado } from '../utilidades'

export const rotaDeProduto = express.Router()
// /api/produtos
rotaDeProduto.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const produtos = await ModeloDeProduto.find()
    res.json(produtos)
  })
)

rotaDeProduto.get(
  '/categorias',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const categorias = await ModeloDeProduto.find().distinct('categoria')
    res.json(categorias)
  })
)

// /api/slug/cadeira-de-crianca
rotaDeProduto.get(
  '/slug/:slug',
  expressAsyncHandler(async (req, res) => {
    const produto = await ModeloDeProduto.findOne({ slug: req.params.slug })
    if (produto) {
      res.json(produto)
    } else {
      res.status(404).json({ message: 'Produto não encontrado' })
    }
  })
)

rotaDeProduto.get(
  '/proprietario/:proprietario',
  expressAsyncHandler(async (req, res) => {
    const produto = await ModeloDeProduto.find({ proprietario: req.params.proprietario })
    if (produto) {
      res.json(produto)
    } else {
      res.status(404).json({ message: 'Produto não encontrado' })
    }
  })
)

rotaDeProduto.get(
  '/editarProduto/:id',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    //const nome = await ModeloDeProduto.findOne(req.body.nome)
    //const proprietario = await ModeloDeProduto.findOne(req.body.proprietario)
    //try{
    //  await ModeloDeProduto.findById(req.body._id)
    //  res.status(200).json({message: 'Produto atualizado com sucesso!'})
//
    //} catch {
    //  res.status(404).json({message: 'Produto não encontrado!'})
    //}
    if (req.body._id) 
    {
      const dadosDoProduto = await ModeloDeProduto.findById(req.body._id)

      res.json({ dadosDoProduto })
      return
    } else {
      res.status(404).json({ message: 'Usuario não encontrado' })
    }
    }
  )
)

rotaDeProduto.put(
  '/editarProduto/:_id',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => {
    //const nome = await ModeloDeProduto.findOne(req.body.nome)
    //const proprietario = await ModeloDeProduto.findOne(req.body.proprietario)
    try{
      await ModeloDeProduto.updateOne(
        {
          _id: req.body._id
        },
        {
          $set:
          {
            nome: req.body.nome,
            slug: req.body.slug,
            imagem: req.body.imagem,
            categoria: req.body.categoriaDoProduto,
            preco: req.body.precoDoProduto,
            emEstoque: req.body.quantidadeDoProduto,
            marca: req.body.marcaDoProduto,
            avaliacao: req.body.avaliacao,
            visualizacoes: req.body.visualizacoes,
            descricao: req.body.descricaoDoProduto,
            proprietario: req.body.proprietario,
          }
        },
        {
          upsert: false, // Set to true if you want to insert a new document if no match is found
        }
      )
      res.status(200).json({message: 'Produto atualizado com sucesso!'})

    } catch {
      res.status(404).json({message: 'Produto não encontrado!'})
    }
    }
  )
)

rotaDeProduto.put(
  '/produtoComprado',
  autenticado,
  expressAsyncHandler(async (req: Request, res: Response) => 
  {
    //const nome = await ModeloDeProduto.findOne(req.body.nome)
    //const proprietario = await ModeloDeProduto.findOne(req.body.proprietario)
    try{
      await ModeloDeProduto.updateOne(
        {
          _id: req.body._id
        },
        {
          $set:
          {
            emEstoque: req.body.quantidadeDoProduto
          }
        },
        {
          upsert: false, // Set to true if you want to insert a new document if no match is found
        }
      )
      res.status(200).json({message: 'Pedido realizado com sucesso!'})

    } catch {
      res.status(404).json({message: 'Erro ao realizar a compra!'})
    }
    }
  )
)

rotaDeProduto.post(
  '/cadastrarProduto',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const produtoCadastrado = await ModeloDeProduto.create({
      nome: req.body.nome,
      slug: req.body.slug,
      imagem : req.body.imagem,
      categoria : req.body.categoriaDoProduto,
      preco : req.body.precoDoProduto,
      emEstoque: req.body.quantidadeDoProduto,
      marca: req.body.marcaDoProduto,
      avaliacao : req.body.avaliacao,
      visualizacoes : req.body.visualizacoes,
      descricao: req.body.descricaoDoProduto,
      proprietario: req.body.proprietario
    } as Produto)
    res.json({
      _id: produtoCadastrado._id,
      nome: produtoCadastrado.nome,
      slug: produtoCadastrado.slug,
      imagem : produtoCadastrado.imagem,
      categoria : produtoCadastrado.categoria,
      preco : produtoCadastrado.preco,
      emEstoque: produtoCadastrado.emEstoque,
      marca: produtoCadastrado.marca,
      avaliacao : produtoCadastrado.avaliacao,
      visualizacoes : produtoCadastrado.visualizacoes,
      descricao: produtoCadastrado.descricao,
      proprietario: produtoCadastrado.proprietario
    })
  })
)