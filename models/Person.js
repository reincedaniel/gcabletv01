'use strict'

module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('person', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        foto: {
            type: DataTypes.TEXT
        },
        firstname: {
            type: DataTypes.STRING,
            required: true
        },
        lastname: {
            type: DataTypes.STRING,
            required: true
        },
        bi: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'BI already in use!'
            }
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        social: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Segurança Social number already in use!'
            }
        },
        genero: {
            type: DataTypes.ENUM,
            values: ['m', 'f'],
            defaultValue: 'm'
        },
        civil: {
            type: DataTypes.ENUM,
            values: ['s', 'c']

        },
        ibanpref: {
            type: DataTypes.STRING
        },
        ibansuf: {
            type: DataTypes.STRING
        },
        doc: {
            type: DataTypes.TEXT
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
    /* Person.sync({
        force: true
    }) */
    return Person;
};