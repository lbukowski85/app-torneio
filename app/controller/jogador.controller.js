const jogadores = require('../model/jogador.model.js');

exports.findAll = (req, res) => {
    jogadores.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "body não pode estar vazio"
        });
    }
    jogadores.find({ nome: req.body.nome }, function (err, data) {
        if (data.length) {
            return res.status(400).send({
                message: 'usuário já cadastrado'
            });
        } else {
            const jogador = new jogadores({
                nome: req.body.nome
            });

            jogador.save()
                .then(data => {
                    return res.send(data);
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message
                    });
                });

        }
    });


};

exports.findOne = (req, res) => {
    jogadores.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Jogador ${req.params.id} não encontrado`
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Jogador ${req.params.id} não encontrado`
                });
            }
            return res.status(500).send({
                message: "Internal server error"
            });
        });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "body não pode estar vazio"
        });
    }

    jogadores.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome
    }, { useFindAndModify: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Jogador ${req.params.id} não encontrado`
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Jogador ${req.params.id} não encontrado`
                });
            }
            return res.status(500).send({
                message: "Internal server error"
            });
        });
};

exports.destroy = (req, res) => {
    jogadores.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Jogador ${req.params.id} não encontrado`
                });
            }
            res.send({ message: `Jogador ${data.nome} deletado com sucesso` });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `Jogador ${req.params.id} não encontrado`
                });
            }
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};