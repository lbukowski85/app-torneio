module.exports = (app) => {
    const pontuacao = require('../controller/pontuacao.controller.js');
    const jwt = require('./jwt.js');

    // Requisito nº4: Cadastrar jogador, etapas, pontos

    app.post('/pontuacao', jwt.verifyToken, pontuacao.create);

    app.delete('/pontuacao', jwt.verifyToken, pontuacao.destroy);

    // Requisito nº5: Visualizar o ranking por etapa
    app.get('/pontuacao/etapa/:id', jwt.verifyToken, pontuacao.pontuacaoPorEtapa);

    // Requisito nº6: Visualizar o ranking por torneio que retorna a soma de todas as etapas
    app.get('/pontuacao/torneio/:id', jwt.verifyToken, pontuacao.pontuacaoPorTorneio);

}