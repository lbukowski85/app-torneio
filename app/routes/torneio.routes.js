module.exports = (app) => {
    const torneio = require('../controller/torneio.controller.js');
    const jwt = require('./jwt.js');

    // Requisito nº1: Cadastrar e visualizar os torneios
    app.get('/torneios', jwt.verifyToken, torneio.findAll);

    app.get('/torneios/:id', jwt.verifyToken, torneio.findOne);

    app.post('/torneios', jwt.verifyToken, torneio.create);

    app.put('/torneios/:id', jwt.verifyToken, torneio.update);

    app.delete('/torneios/:id', jwt.verifyToken, torneio.destroy);

}