const mongoose = require('mongoose');

const Jogador = mongoose.Schema({
    nome: String
}, {
    collection: 'jogador'
});

module.exports = mongoose.model('jogador', Jogador);