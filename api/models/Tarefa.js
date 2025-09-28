class Tarefa {
  constructor({ objectId, descricao, concluida = false, criadoEm = null, atualizadoEm = null }) {
    this.objectId = objectId;      // UUID
    this.descricao = descricao;    // string
    this.concluida = concluida;    // boolean
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}

module.exports = Tarefa;