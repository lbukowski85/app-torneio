module.exports = (app) => {
    const jogador = require('../controller/jogador.controller.js');
    const jwt = require('./jwt.js');

    // Requisito nº3: Cadastrar e visualizar os jogadores
    app.get('/jogador', jwt.verifyToken, jogador.findAll);

    app.get('/jogador/:id', jwt.verifyToken, jogador.findOne);

    app.post('/jogador', jwt.verifyToken, jogador.create);

    app.put('/jogador/:id', jwt.verifyToken, jogador.update);

    app.delete('/jogador/:id', jwt.verifyToken, jogador.destroy);

}