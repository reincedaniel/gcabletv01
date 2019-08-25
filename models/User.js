'use strict'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username address already in use!'
            }
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        tipo: {
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'client', 'disabled'],
            defaultValue: 'user'
        },
        person_id: {
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

    /* User.sync({
        force: true
    }) */
    return User;
};