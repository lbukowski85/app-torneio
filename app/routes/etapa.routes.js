module.exports = (app) => {
    const etapa = require('../controller/etapa.controller.js');
    const jwt = require('./jwt.js');

    // Requisito nº2: Cadastrar e visualizar as etapas
    app.get('/etapa', jwt.verifyToken, etapa.findAll);

    app.get('/etapa/:id', jwt.verifyToken, etapa.findOne);

    app.post('/etapa', jwt.verifyToken, etapa.create);

    app.put('/etapa/:id',  jwt.verifyToken, etapa.update);

    app.delete('/etapa/:id', jwt.verifyToken, etapa.destroy);

}