'use strict'

module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('contract', {
        client_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        type_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
            type: DataTypes.DATE
        },
        doc: {
            type: DataTypes.TEXT
        },
        activo: {
            type: DataTypes.ENUM,
            values: ['yes', 'no'],
            defaultValue: 'yes'

        }
    });
    //Struct

    Contract.sync({
        force: true
    })

    return Contract;

};