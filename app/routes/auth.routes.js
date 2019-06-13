module.exports = (app) => {
    const jwt = require('jsonwebtoken');
    const usuario = require('../model/usuario.model.js');

    app.post('/login', (req, res, next) => {
        let id = null;
        usuario.find({ 'nome': req.body.nome, 'senha': req.body.senha }, function (err, data) {
            if (err) console.log(err);
            if (data[0] !== undefined) {
                id = data[0]._id;
            }
        }).then(() => {
            if (id !== null) {
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 600
                });
                res.status(200);
                res.json({ auth: true, token: token });
                return next();
            } else {
                res.status(500).send('login inválido');
                return next();
            }

        });

    })

}