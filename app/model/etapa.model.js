const mongoose = require('mongoose');
const torneios = require('../model/torneio.model.js');

const Etapa = mongoose.Schema({
    nome: String,
    descricao: String,
    ordem: Number,
    torneioObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'torneio',
        autopopulate: true
    }
}, {
    collection: 'etapa'
});

module.exports = mongoose.model('etapa', Etapa);