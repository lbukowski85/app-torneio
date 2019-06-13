const mongoose = require('mongoose');
const database = require('./mongo.js');
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express();

// parse da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./.env');
require('../app/routes/torneio.routes.js')(app);
require('../app/routes/etapa.routes.js')(app);
require('../app/routes/jogador.routes.js')(app);
require('../app/routes/pontuacao.routes.js')(app);
require('../app/routes/auth.routes.js')(app);

mongoose.Promise = global.Promise;

mongoose.connect(database.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Conectado com sucesso');
}).catch(err => {
    console.log(`Erro ao conectar em ${database.url}: ${err}`);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({
        'error': 0,
        'message': 'Bem vindo ao Invillia-Torneios'
    });
});

app.listen(process.env.PORT || database.port, () => {
    console.log(`API Invillia-Torneio - listening on ${database.port}`);
});

module.exports = app


