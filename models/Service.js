'use strict'

module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('service', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            required: true
        },
        price: {
            type: DataTypes.DECIMAL,
            required: true
        },
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
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

    /* Service.sync({
        force: true
    }) */

    return Service;

};