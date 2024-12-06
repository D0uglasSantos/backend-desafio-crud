const Evento = require('../models/Evento');

const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEvento = async (req, res) => {
  const { nome, dataEvento, inicioInscricoes, fimInscricoes } = req.body;

  try {
    const newEvento = await Evento.create({
      nome,
      dataEvento,
      inicioInscricoes,
      fimInscricoes,
    });
    await newEvento.save();
    res.status(201).json(newEvento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEvento = async (req, res) => {
  const { _id } = req.params;
  const { nome, dataEvento, inicioInscricoes, fimInscricoes } = req.body;

  try {
    const updatedEvento = await Evento.findByIdAndUpdate(
      _id,
      { nome, dataEvento, inicioInscricoes, fimInscricoes },
      { new: true, runValidators: true }
    );
    if (!updatedEvento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.json(updatedEvento);
  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    res.status(400).json({ message: err.message });
  }
};

const deleteEvento = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedEvento = await Evento.findByIdAndDelete(_id);
    if (!deletedEvento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEventos, createEvento, updateEvento, deleteEvento };