import Cart from '../services/cart.services'
import express from 'express'
const router = express.Router()
const cart = new Cart()

router.get('/', (req, res) => {
  (async () => {
    res.json(await cart.getAll())
  })()
})

router.get('/:id', (req, res) => {
  (async () => {
    res.json(await cart.getOne(parseInt(req.params.id)))
  })()
})

router.post('/', (req, res) => {
  (async () => {
    res.json(await cart.postOne(req.body))
  })()
})

router.put('/:id', (req, res) => {
  (async () => {
    res.json(await cart.updateOne(parseInt(req.params.id), req.body))
  })()
})

module.exports = router;