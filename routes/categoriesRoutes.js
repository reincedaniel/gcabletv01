//import the models (as noted above use a db object)
const db = require('../models/db')
//Express and app object
const express = require('express')

//Define routes way
const router = express.Router()

//Retornar todos as categorias
router.get('/', (req, res) => {
    var code = 500
    var message = 'Internal Server Error'
    //var result = ''
    response = 0;

    var page = req.query.page || 1
    var limit = req.query.limit || 5
    var offset = (page - 1) * limit

    db.Category
        .findAndCountAll({
            include: [{
                model: db.Service
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
                        categories: result
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

//Retornando apenas uma categoria, pelo id
router.get('/:id', function (req, res, next) {
    var code = 500
    var message = 'Internal Server Error'
    var response = 0;

    var id = req.params.id | 0

    db.Category
        .find({
            include: [{
                model: db.Service
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
                        categories: result
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

/* Cadastrando categorias. */
router.post('/', function (req, res, next) {
    var code = 500;
    var message = 'Internal Server Error';
    var response = 0;

    var postData = {
        description: req.body.description,
        activo: req.body.activo

    }

    db.Category.create(postData)
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
                        categories: model
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
        description: req.body.description,
        activo: req.body.activo

    };

    db.Category.update(putData, {
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


/* Deletar Uma categoria */
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

    db.Category.destroy({
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