const { v4: uuidv4, validate: uuidValidate } = require('uuid');
const Tarefa = require('../models/Tarefa');
const tarefas = [];

function criarTarefa(req, res) {
  const { descricao, concluida } = req.body;

  if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
    return res.status(400).json({ error: 'O campo "descricao" é obrigatório e deve ser uma string.' });
  }

  const nova = new Tarefa({
    objectId: uuidv4(),
    descricao: descricao.trim(),
    concluida: typeof concluida === 'boolean' ? concluida : false,
    criadoEm: new Date().toISOString()
  });

  tarefas.push(nova);
  return res.status(201).json(nova);
}

function listarTarefas(req, res) {
  return res.json(tarefas);
}

function obterTarefa(req, res) {
  const { objectId } = req.params;
  if (!uuidValidate(objectId)) {
    return res.status(400).json({ error: 'objectId inválido (esperado UUID).' });
  }

  const t = tarefas.find(item => item.objectId === objectId);
  if (!t) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  return res.json(t);
}

function atualizarTarefa(req, res) {
  const { objectId } = req.params;
  if (!uuidValidate(objectId)) {
    return res.status(400).json({ error: 'objectId inválido (esperado UUID).' });
  }

  const idx = tarefas.findIndex(item => item.objectId === objectId);
  if (idx === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  const { descricao, concluida } = req.body;
  if (descricao !== undefined) {
    if (typeof descricao !== 'string' || descricao.trim() === '') {
      return res.status(400).json({ error: 'Se fornecida, "descricao" deve ser uma string não vazia.' });
    }
    tarefas[idx].descricao = descricao.trim();
  }
  if (concluida !== undefined) {
    if (typeof concluida !== 'boolean') {
      return res.status(400).json({ error: 'Se fornecido, "concluida" deve ser boolean.' });
    }
    tarefas[idx].concluida = concluida;
  }

  tarefas[idx].atualizadoEm = new Date().toISOString();

  return res.json(tarefas[idx]);
}

function removerTarefa(req, res) {
  const { objectId } = req.params;
  if (!uuidValidate(objectId)) {
    return res.status(400).json({ error: 'objectId inválido (esperado UUID).' });
  }

  const idx = tarefas.findIndex(item => item.objectId === objectId);
  if (idx === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  tarefas.splice(idx, 1);
  return res.status(204).send();
}

module.exports = {
  criarTarefa,
  listarTarefas,
  obterTarefa,
  atualizarTarefa,
  removerTarefa
};