const mongoose = require('mongoose');
const etapas = require('../model/etapa.model.js');
const jogadores = require('../model/etapa.model.js');

const Pontuacao = mongoose.Schema({
    jogadorObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jogador',
        autopopulate: true
    },
    etapaObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'etapa',
        autopopulate: true
    },
    score: Number 
},
    { collection: 'pontuacao' });

module.exports = mongoose.model('pontuacao', Pontuacao);