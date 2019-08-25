'use strict'

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('payment', {
        contract_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        mes: {
            type: DataTypes.DATE
        },
        multa: {
            type: DataTypes.DECIMAL,
            required: true
        },
        desconto: {
            type: DataTypes.DECIMAL,
            required: true
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

    Payment.sync({
        force: true
    })

    return Payment;

};