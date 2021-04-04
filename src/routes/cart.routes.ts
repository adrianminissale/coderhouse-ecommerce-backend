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
    res.json(await cart.getOne(req.params.id))
  })()
})

router.post('/', (req, res) => {
  (async () => {
    res.json(await cart.postOne(req.body))
  })()
})

router.put('/:id', (req, res) => {
  (async () => {
    res.json(await cart.updateOne(req.params.id, req.body))
  })()
})

router.delete('/:id', (req, res) => {
  (async () => {
    res.json(await cart.deleteOne(req.params.id))
  })()
})

module.exports = router;