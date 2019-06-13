const mongoose = require('mongoose');

const Usuario = mongoose.Schema({
    nome: String,
    senha: String
},
    { collection: 'usuario' });

module.exports = mongoose.model('usuario', Usuario);