import express from 'express';
import Chats from '../services/chats.services';

const router = express.Router();
const chat = new Chats();

router.get('/', (req, res) => {
  (async () => {
    res.json(await chat.getAll());
  })();
});

router.get('/:id', (req, res) => {
  (async () => {
    res.json(await chat.getOne(req.params.id));
  })();
});

router.post('/', (req, res) => {
  (async () => {
    res.json(await chat.postOne(req.body));
  })();
});

router.put('/:id', (req, res) => {
  (async () => {
    res.json(await chat.updateOne(req.params.id, req.body));
  })();
});

router.delete('/:id', (req, res) => {
  (async () => {
    res.json(await chat.deleteOne(req.params.id));
  })();
});

module.exports = router;
