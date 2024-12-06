const mongoose = require('mongoose');

const EmbarcacaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true },
  atletas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Atleta' }]
});

module.exports = mongoose.model('Embarcacao', EmbarcacaoSchema);