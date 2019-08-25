//import the models (as noted above use a db object)
const db = require('../models/db')
//Express and app object
const express = require('express')

//Define routes way
const router = express.Router()

//Retornar todos as clientes
router.get('/', (req, res) => {
    var code = 500
    var message = 'Internal Server Error'
    //var result = ''

    var page = req.query.page || 1
    var limit = req.query.limit || 5
    var offset = (page - 1) * limit

    db.Client
        .findAndCountAll({
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
                        clients: result
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

//Retornando apenas uma clientes, pelo id
router.get('/:id', function (req, res, next) {
    var code = 500
    var message = 'Internal Server Error'
    var response = 0;

    var id = req.params.id | 0

    db.Client
        .find({
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
                        clients: result
                    }
                }
            })
        })
        .catch((error) => {
            code = 500;
            response = 0;


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

/* Cadastrando clientes. */
router.post('/', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;

    var postData = {
        person_id: req.body.person_id,
        tipo: req.body.tipo,
        activo: req.body.activo

    }

    db.Client.create(postData)
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
                        clients: model
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

/* Editar Clientes. */

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
        person_id: req.body.person_id,
        tipo: req.body.tipo,
        activo: req.body.activo

    };

    db.Client.update(putData, {
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
                        categories: id
                    }
                }
            });
        })
        .catch((error) => {
            code = 500;
            response = 0;

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


/* Deletar Um cliente */
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

    db.Client.destroy({
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

module.exports = router