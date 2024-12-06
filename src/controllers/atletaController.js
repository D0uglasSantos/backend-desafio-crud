const Atleta = require('../models/Atleta');
const Embarcacao = require("../models/Embarcacao");

const getAllAtletas = async (req, res) => {
  try {
    const atletas = await Atleta.find().populate('embarcacoes', 'nome codigo');
    res.json(atletas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAtleta = async (req, res) => {
  const { nome, cpf, embarcacoes } = req.body;

  try {
    const embarcacoesIds = await Promise.all(
      embarcacoes.map(async (embarcacao) => {
        const newEmbarcacao = new Embarcacao({
          nome: embarcacao.nome,
          codigo: embarcacao.codigo,
        });
        await newEmbarcacao.save();
        return newEmbarcacao._id;
      })
    );

    const newAtleta = new Atleta({
      nome,
      cpf,
      embarcacoes: embarcacoesIds,
    });
    await newAtleta.save();

    res.status(201).json(newAtleta);
  } catch (error) {
    console.error("Erro ao criar atleta:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateAtleta = async (req, res) => {
  const { _id } = req.params;
  const { nome, cpf, embarcacoes } = req.body;

  try {
    // Update existing vessels and create new ones
    const updatedEmbarcacoes = await Promise.all(
      embarcacoes.map(async (embarcacao) => {
        if (embarcacao._id) {
          // Update existing vessel
          await Embarcacao.findByIdAndUpdate(embarcacao._id, {
            nome: embarcacao.nome,
            codigo: embarcacao.codigo,
          });
          return embarcacao._id;
        } else {
          // Create new vessel
          const newEmbarcacao = new Embarcacao({
            nome: embarcacao.nome,
            codigo: embarcacao.codigo,
          });
          await newEmbarcacao.save();
          return newEmbarcacao._id;
        }
      })
    );

    const updatedAtleta = await Atleta.findByIdAndUpdate(
      _id,
      { nome, cpf, embarcacoes: updatedEmbarcacoes },
      { new: true, runValidators: true }
    ).populate('embarcacoes', 'nome codigo');

    if (!updatedAtleta) {
      return res.status(404).json({ message: "Atleta não encontrado" });
    }
    res.json(updatedAtleta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAtleta = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedAtleta = await Atleta.findByIdAndDelete(_id);
    if (!deletedAtleta) {
      return res.status(404).json({ message: "Atleta não encontrado" });
    }
    // Delete associated vessels
    await Embarcacao.deleteMany({ _id: { $in: deletedAtleta.embarcacoes } });
    res.json({ message: "Atleta e embarcações associadas deletados com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllAtletas, createAtleta, updateAtleta, deleteAtleta };

