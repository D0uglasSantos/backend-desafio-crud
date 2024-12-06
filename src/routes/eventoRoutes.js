const express = require('express');
const router = express.Router();
const { getEventos, createEvento, updateEvento, deleteEvento } = require('../controllers/eventoController');

router.get('/', getEventos);
router.post('/', createEvento);
router.put('/:_id', updateEvento);
router.delete('/:_id', deleteEvento);

module.exports = router;
