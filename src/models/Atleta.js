const mongoose = require('mongoose');

const AtletaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  embarcacoes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Embarcacao' }
  ],
});

module.exports = mongoose.model('Atleta', AtletaSchema);
