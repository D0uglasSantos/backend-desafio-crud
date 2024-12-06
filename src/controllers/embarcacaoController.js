const Embarcacao = require('../models/Embarcacao');

const getEmbarcacoes = async (req, res) => {
  try {
    const embarcacoes = await Embarcacao.find();
    res.json(embarcacoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmbarcacao = async (req, res) => {
  const { nome, codigo } = req.body;

  try {
    const newEmbarcacao = await Embarcacao.create({ nome, codigo });
    await newEmbarcacao.save();
    res.status(201).json(newEmbarcacao);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEmbarcacao = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmbarcacao = await Embarcacao.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmbarcacao) {
      return res.status(404).json({ message: 'Embarcação não encontrada' });
    }
    res.json(updatedEmbarcacao);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEmbarcacao = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmbarcacao = await Embarcacao.findByIdAndDelete(id);
    if (!updatedEmbarcacao) {
      return res.status(404).json({ message: 'Embarcação não encontrada' });
    }
    res.json({ message: 'Embarcação excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEmbarcacoes, createEmbarcacao, updateEmbarcacao, deleteEmbarcacao };