const express = require('express');
const router = express.Router();
const { updateEmbarcacao, createEmbarcacao, getEmbarcacoes, deleteEmbarcacao } = require('../controllers/embarcacaoController');

router.get('/', getEmbarcacoes);
router.post('/', createEmbarcacao);
router.put('/:id', updateEmbarcacao);
router.delete('/:id', deleteEmbarcacao);

module.exports = router;
