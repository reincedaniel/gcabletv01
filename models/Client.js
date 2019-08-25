'use strict'

module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        person_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Client duplicated'
            }
        },
        tipo: {
            type: DataTypes.ENUM,
            values: ['normal', 'max', 'super', 'disabled'],
            defaultValue: 'normal'
        },
        activo: {
            type: DataTypes.ENUM,
            values: ['yes', 'no'],
            defaultValue: 'yes'

        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        paranoid: true,
        underscored: true,
        timestamps: false
    });
    //Struct

    /* Client.sync({
        force: true
    }) */

    return Client;

};