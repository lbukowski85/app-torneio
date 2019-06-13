const mongoose = require('mongoose');

const Torneio = mongoose.Schema({
    nome: String,
    descricao: String
},
    { collection: 'torneio' });

module.exports = mongoose.model('torneio', Torneio);