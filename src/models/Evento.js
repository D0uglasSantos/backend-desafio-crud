const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataEvento: { type: Date, required: true },
  inicioInscricoes: { type: Date, required: true },
  fimInscricoes: { type: Date, required: true },
});

module.exports = mongoose.model('Evento', EventoSchema);
