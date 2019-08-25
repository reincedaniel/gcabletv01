//import the models (as noted above use a db object)
const db = require('../models/db')
//Express and app object
const express = require('express')

//Define routes way
const router = express.Router()

//Retornar todos os usuarios
router.get('/', (req, res) => {
    var code = 500
    var message = 'Internal Server Error'
    //var result = ''

    var page = req.query.page || 1
    var limit = req.query.limit || 5
    var offset = (page - 1) * limit

    db.User
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
                        users: result
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

//Retornando apenas um usuarios, pelo id
router.get('/:id', function (req, res, next) {
    var code = 500
    var message = 'Internal Server Error'
    var response = 0;

    var id = req.params.id | 0

    db.User
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
                        users: result
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

/* Cadastrando usuarios. */
router.post('/', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;

    var postData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tipo: req.body.tipo,
        person_id: req.body.person_id,
        activo: req.body.activo
    }

    db.User.create(postData)
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
                        users: model
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

/* Editar usuarios. */

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
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tipo: req.body.tipo,
        person_id: req.body.person_id,
        activo: req.body.activo

    };

    db.User.update(putData, {
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
                        users: id
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


/* Deletar Um usuarios */
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

    db.User.destroy({
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