import express from 'express';
import Products from '../services/products.services';

const router = express.Router();
const prod = new Products();

router.get('/', (req, res) => {
  (async () => {
    res.json(await prod.getAll());
  })();
});

router.get('/vista-test', (req, res) => {
  (async () => {
    const cant = parseInt((req.query as any).cant, 10);
    res.json(await prod.getAllTest(cant));
  })();
});

router.get('/:id', (req, res) => {
  (async () => {
    res.json(await prod.getOne(req.params.id));
  })();
});

router.post('/', (req, res) => {
  (async () => {
    res.json(await prod.postOne(req.body));
  })();
});

router.put('/:id', (req, res) => {
  (async () => {
    res.json(await prod.updateOne(req.params.id, req.body));
  })();
});

router.delete('/:id', (req, res) => {
  (async () => {
    res.json(await prod.deleteOne(req.params.id));
  })();
});

module.exports = router;
