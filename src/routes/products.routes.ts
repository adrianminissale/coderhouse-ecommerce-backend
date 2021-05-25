import Products from '../services/products.services'
import express from 'express'
const router = express.Router()
const prod = new Products()

router.get('/', (req, res) => {
  (async () => {
    res.json(await prod.getAll(req.query))
  })()
})

router.get('/:id', (req, res) => {
  (async () => {
    res.json(await prod.getOne(req.params.id))
  })()
})

router.post('/', (req, res) => {
  (async () => {
    res.json(await prod.postOne(req.body))
  })()
})

router.put('/:id', (req, res) => {
  (async () => {
    res.json(await prod.updateOne(req.params.id, req.body))
  })()
})

router.delete('/:id', (req, res) => {
  (async () => {
    res.json(await prod.deleteOne(req.params.id))
  })()
})

module.exports = router;