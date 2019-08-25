'use strict'

module.exports = (sequelize, DataTypes) => {
    const Dissolution = sequelize.define('dissolution', {
        contract_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        motivo: {
            type: DataTypes.STRING,
            required: true
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

    Dissolution.sync({
        force: true
    })

    return Dissolution;

};