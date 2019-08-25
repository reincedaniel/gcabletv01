"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize("testcabletv", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    underscored: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Person = require("./Person")(sequelize, Sequelize)
db.User = require("./User")(sequelize, Sequelize)

db.Service = require("./Service")(sequelize, Sequelize)
db.Category = require("./Category")(sequelize, Sequelize)

db.Client = require("./Client")(sequelize, Sequelize)

//pessoas ----envia o seu id para--->usuarios
db.Person.hasMany(db.User);

//Categoria ----envia para---> Serviços
db.Category.hasMany(db.Service)

//Pessoa ----envia para---> cliente
db.Person.hasOne(db.Client)

/* db.sequelize.sync({
  force: true
}) */
module.exports = db;