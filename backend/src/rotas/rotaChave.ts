import express from 'express'

export const rotaChave = express.Router()

rotaChave.get('/paypal', (req, res) => {
  res.json({ idDoCliente: process.env.PAYPAL_CLIENT_ID || 'sb' })
})
