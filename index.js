//import express and instantiate your app object
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//Importar as routas
const peopleRoutes = require('./routes/peopleRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const usersRoutes = require('./routes/usersRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const servicesRoutes = require('./routes/servicesRoutes')

//Rotas para pessoas
app.use('/people', peopleRoutes)

//Rotas para usuarios
app.use('/users', usersRoutes)

//Rotas para clientes
app.use('/clients', clientsRoutes)

//Rotas para categorias
app.use('/categories', categoriesRoutes)

//Rotas para categorias
app.use('/services', servicesRoutes)

//Rodando o servidor
app.listen(1229, () => {
    console.log('Rodando em: http://localhost:1229')
})