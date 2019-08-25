'use strict'

module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('type', {
        description: {
            type: DataTypes.STRING,
            required: true
        }
    });
    //Struct

    Type.sync({
        force: true
    })

    return Type

};