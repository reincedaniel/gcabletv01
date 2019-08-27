//import the models (as noted above use a db object)
const db = require('../models/db')
//Express and app object
const express = require('express')

//Define routes way
const router = express.Router()



//Retornar todos as pessoas
router.get('/', (req, res) => {
    var code = 500
    var message = 'Internal Server Error'
    //var result = ''
    response = 0;

    var page = req.query.page || 1
    var limit = req.query.limit || 5
    var offset = (page - 1) * limit

    db.Person
        .findAndCountAll({
            include: [{
                model: db.User,
                attributes: {
                    exclude: ['password']
                }
            }, {
                model: db.Client
            }],
            offset: +offset,
            limit: +limit
        })
        .then(result => {
            code = 200
            message = 'OK'
            response = 1;

            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    data: {
                        people: result
                    }
                }
            })
        }).catch((error) => {
            res.json({
                code: code,
                message: message,
                response: {
                    error: {
                        icode: response,
                        details: error
                    }
                }
            })
        })
})

//Retornando apenas uma pessoa, pelo id
router.get('/:id', function (req, res, next) {
    var code = 500
    var message = 'Internal Server Error'
    var response = 0;

    var id = req.params.id | 0

    db.Person
        .find({
            include: [{
                model: db.User,
                attributes: {
                    exclude: ['password']
                }
            }, {
                model: db.Client
            }],
            where: {
                id: id
            }
        })
        .then(result => {
            code = 200;
            message = 'OK'
            response = 1;
            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    data: {
                        people: result
                    }
                }
            })
        })
        .catch((error) => {
            code = 500;
            response = message;


            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    error: error
                }
            });
        });
})

/* Cadastrando Pessoas. */
router.post('/', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;

    var postData = {
        foto: req.body.foto,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bi: req.body.bi,
        birth: req.body.birth,
        social: req.body.social,
        genero: req.body.genero,
        civil: req.body.civil,
        ibanpref: req.body.ibanpref,
        ibansuf: req.body.ibansuf,
        doc: req.body.doc,
        activo: req.body.activo
    }

    db.Person.create(postData)
        .then((model) => {
            code = 200;
            message = 'OK';
            response = 1;

            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    data: {
                        people: model
                    }

                }
            });
        })
        .catch((error) => {
            code = 500;
            response = message;

            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    error: error
                }
            });
        });
});

/* Editar Pessoas. */

router.put('/:id', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;
    if (isNaN(req.params.id)) {
        code = 500;
        response = 11111;

        res.json({
            code: code,
            message: message,
            response: {
                icode: response
            }
        });
    }
    var id = req.params.id;

    var putData = {
        foto: req.body.foto,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bi: req.body.bi,
        birth: req.body.birth,
        social: req.body.social,
        genero: req.body.genero,
        civil: req.body.civil,
        ibanpref: req.body.ibanpref,
        ibansuf: req.body.ibansuf,
        doc: req.body.doc,
        activo: req.body.activo

    };

    db.Person.update(putData, {
            where: {
                id: id
            }
        })
        .then(function (model) {
            code = 200;
            message = 'OK';
            response = 1;

            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    data: {
                        people: id
                    }
                }
            });
        })
        .catch((error) => {
            code = 500;
            response = message;

            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    error: error
                }
            });
        });
});


/* Deletar Uma Pessoa */
router.delete('/:id', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;

    if (isNaN(req.params.id)) {
        code = 500;
        response = 11111;

        res.json({
            code: code,
            message: message,
            response: {
                icode: response
            }
        });
    }

    var id = req.params.id;

    db.Person.destroy({
            where: {
                id: id
            }
        })
        .then(function (deletedRecord) {
            if (deletedRecord === 1) {
                code = 200;
                message = 'OK';
                response = 1;
            } else {
                code = 404;
                message = 'OK';
                response = 2;
            }
            res.json({
                code: code,
                message: message,
                response: {
                    icode: response
                }
            });
        })
        .catch(function (error) {
            code = 500;
            response = message;

            res.json({
                code: code,
                message: message,
                response: {
                    icode: response,
                    error: error
                }
            });
        });
});
//**********************************************************************************


module.exports = router