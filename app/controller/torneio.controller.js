const torneios = require('../model/torneio.model.js');

exports.findAll = (req, res) => {
    torneios.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "body não pode estar vazio"
        });
    }
    const torneio = new torneios({
        nome: req.body.nome, 
        descricao: req.body.descricao
    });

    torneio.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findOne = (req, res) => {
    torneios.findById(req.params.id)
    .then(torneio => {
        if(!torneio) {
            return res.status(404).send({
                message: `Torneio ${req.params.id} não encontrado`
            });            
        }
        res.send(torneio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Torneio ${req.params.id} não encontrado`
            });                
        }
        return res.status(500).send({
            message: "Internal server error"
        });
    });
};


exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "body não pode estar vazio"
        });
    }

    torneios.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome, 
        descricao: req.body.descricao
    }, {useFindAndModify: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: `Torneio ${req.params.id} não encontrado`
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Torneio ${req.params.id} não encontrado`
            });                
        }
        return res.status(500).send({
            message: "Internal server error"
        });
    });
};

exports.destroy = (req, res) => {
    torneios.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: `Torneio ${req.params.id} não encontrado`
            });
        }
        res.send({message: `Torneio ${data.nome} deletado com sucesso`});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Torneio ${req.params.id} não encontrado`
            });                
        }
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    });
};