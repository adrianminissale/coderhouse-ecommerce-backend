import Products from '../services/products.services'
import express from 'express'
const router = express.Router()
const prod = new Products()

router.get('/', (req, res) => {
  (async () => {
    res.json(await prod.getAll())
  })()
})

router.get('/:id', (req, res) => {
  (async () => {
    res.json(await prod.getOne(parseInt(req.params.id)))
  })()
})

router.post('/', (req, res) => {
  (async () => {
    res.json(await prod.postOne(req.body))
  })()
})

router.put('/:id', (req, res) => {
  (async () => {
    res.json(await prod.updateOne(parseInt(req.params.id), req.body))
  })()
})

router.delete('/:id', (req, res) => {
  (async () => {
    res.json(await prod.deleteOne(parseInt(req.params.id)))
  })()
})

module.exports = router;