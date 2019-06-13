const etapas = require('../model/etapa.model.js');

exports.findAll = (req, res) => {
    etapas.find().populate('torneioObj')
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
    // user.verifyUser(obj.name, function(err, rows) {
    //     if (rows.length > 0) {
    //       res.send({
    //         res: "usuário já cadastrado"
    //       })
    //     } else {
    const etapa = new etapas({
        nome: req.body.nome, 
        descricao: req.body.descricao,
        ordem: req.body.ordem,
        torneioObj: req.body.torneioObj
    });

    etapa.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findOne = (req, res) => {
    etapas.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: `Etapa ${req.params.id} não encontrado`
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Etapa ${req.params.id} não encontrado`
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

    etapas.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome, 
        descricao: req.body.descricao,
        ordem: req.body.ordem,
        torneioObj: req.body.torneioObj        
    }, {useFindAndModify: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: `Etapa ${req.params.id} não encontrado`
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Etapa ${req.params.id} não encontrado`
            });                
        }
        return res.status(500).send({
            message: "Internal server error"
        });
    });
};

exports.destroy = (req, res) => {
    etapas.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: `Etapa ${req.params.id} não encontrado`
            });
        }
        res.send({message: `Etapa ${data.nome} deletado com sucesso`});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Etapa ${req.params.id} não encontrado`
            });                
        }
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    });
};