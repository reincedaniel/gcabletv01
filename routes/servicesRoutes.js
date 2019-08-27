//import the models (as noted above use a db object)
const db = require('../models/db')
//Express and app object
const express = require('express')

//Define routes way
const router = express.Router()

//Retornar todos os serviços
router.get('/', (req, res) => {
    var code = 500
    var message = 'Internal Server Error'
    //var result = ''
    response = 0;

    var page = req.query.page || 1
    var limit = req.query.limit || 5
    var offset = (page - 1) * limit

    db.Service
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
                        services: result
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

//Retornando apenas um serviço, pelo id
router.get('/:id', function (req, res, next) {
    var code = 500
    var message = 'Internal Server Error'
    var response = 0;

    var id = req.params.id | 0

    db.Service
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
                        services: result
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

/* Cadastrando serviços. */
router.post('/', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;

    var postData = {
        price: req.body.price,
        category_id: req.body.category_id,
        description: req.body.description,
        activo: req.body.activo
    }

    db.Service.create(postData)
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
                        services: model
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

/* Editar serviço. */

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
        price: req.body.price,
        category_id: req.body.category_id,
        description: req.body.description,
        activo: req.body.activo

    };

    db.Service.update(putData, {
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
                        services: id
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


/* Deletar Um serviço */
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

    db.Service.destroy({
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

module.exports = router