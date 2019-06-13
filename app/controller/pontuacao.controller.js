const pontuacoes = require('../model/pontuacao.model.js');
const jogadores = require('../model/jogador.model.js');
const etapas = require('../model/etapa.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "body não pode estar vazio"
        });
    }
    pontuacoes.findOne({ jogadorObj: req.body.jogadorObj, etapaObj: req.body.etapaObj }, function (err, pontuacao) {
        let save = false;
        if (pontuacao !== null) {
            pontuacao.score = req.body.score;
        } else {
            pontuacao = new pontuacoes({
                jogadorObj: req.body.jogadorObj,
                etapaObj: req.body.etapaObj,
                score: req.body.score
            });
        }

        let error = 0;
        jogadores.findOne({ _id: req.body.jogadorObj }, function (err, data) {
            if (data === null) error = 1;
        }).then(() => {
            etapas.findOne({ _id: req.body.etapaObj }, function (err, data) {
                if (data === null) error = 1;
            }).then(() => {
                if (error) {
                    res.status(400).send({
                        message: "jogador ou etapa não existe"
                    });
                } else {
                    pontuacao.save()
                        .then(data => {
                            res.send(data);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message
                            });
                        });
                }

            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    });
};


exports.destroy = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "body não pode estar vazio"
        });
    }
    pontuacoes.findOne({ jogador_id: req.body.jogador_id, etapa_id: req.body.etapa_id }, function (err, pontuacao) {
        if (pontuacao !== null) {
            pontuacao.remove({ _id: pontuacao._id });
            res.send({ message: `Pontuação do jogador:${req.body.jogador_id} e etapa:${req.body.etapa_id} deletado com sucesso` });
        } else {
            return res.status(404).send({
                message: `Pontuacao do jogador:${req.body.jogador_id} e etapa:${req.body.etapa_id} não encontrado`
            });

        }
    });

};


var arrayPorEtapa = function (id) {
    return new Promise(function (resolve, rej) {
        pontuacoes.countDocuments({ etapaObj: id }, function (err, countEtapas) {
            pontuacoes.find({ etapaObj: id })
                .populate('jogadorObj')
                .sort({ score: -1 }).exec(function (err, data) {
                    let posicao = 1;
                    let resultados = Array();
                    //console.log(`Etapa ${id}`);
                    data.forEach(dado => {
                        resultado = {
                            etapa: id,
                            posicao: posicao,
                            nome: dado.jogadorObj.nome,
                            pontos: countEtapas
                        };
                        resultados.push(resultado);
                        //console.log(`${posicao}º: ${dado.jogadorObj.nome}: ${countEtapas} Pontos`);
                        countEtapas--;
                        posicao++;
                    });
                    resolve(resultados);
                });
        });
    });
};


var setEtapasPlacar = function (etapas) {

    return new Promise(function (resolve, rej) {
        var placarFinal = Array();
        let queue = 0;
        etapas.forEach(dado => {
            queue++;
            arrayPorEtapa(dado._id).then((resultados) => {

                resultados.forEach(result => {
                    placarFinal.push({
                        nome: result.nome,
                        pontos: result.pontos
                    })
                });
                queue--;
                if (queue === 0) {
                    resolve(placarFinal)
                }
            });
        });
    });
};


exports.pontuacaoPorEtapa = (req, res) => {

    arrayPorEtapa(req.params.id).then((resultado) => {
        res.status(200).json(resultado);
    });
};



exports.pontuacaoPorTorneio = (req, res) => {

    pontuacoes.find({}).populate({
        path: "etapaObj",
        match: {
            "torneioObj": { "$eq": req.params.id }
        }
    }).then(data => {

        var etapas = Array();
        var filtro = data.filter(function (elem, i, array) {
            if (elem.etapaObj !== null) etapas.push(elem.etapaObj);
            return elem.etapaObj !== null;
        });

        setEtapasPlacar(etapas).then((placar) => {
            totals = placar.reduce(function (prev, elem) {
                (prev[elem.nome]) ? prev[elem.nome] += elem.pontos : prev[elem.nome] = elem.pontos;
                return prev;
            }, {});

            let array = Array()           
            for (var key in totals) {
                array.push({ nome: key, pontos: totals[key]})
            }
            array = array.sort((a,b) => b.pontos - a.pontos)
            let pos = 1;
            array.forEach(function(arr) { arr.posicao = pos++ });

            console.log(array);
            res.status(200).send(array);
        });
    });
};