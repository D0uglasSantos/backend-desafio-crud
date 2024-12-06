const express = require('express');
const { getAllAtletas, createAtleta, deleteAtleta, updateAtleta } = require('../controllers/atletaController');
const router = express.Router();

router.get('/', getAllAtletas);
router.post('/', createAtleta);
router.put('/:_id', updateAtleta);
router.delete('/:_id', deleteAtleta);

module.exports = router;
