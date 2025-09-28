const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefasController');

router.post('/', controller.criarTarefa);
router.get('/', controller.listarTarefas);
router.get('/:objectId', controller.obterTarefa);
router.put('/:objectId', controller.atualizarTarefa);
router.delete('/:objectId', controller.removerTarefa);

module.exports = router;