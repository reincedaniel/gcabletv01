'use strict'

module.exports = (sequelize, DataTypes) => {
    const Contractsservice = sequelize.define('contractsservice', {
        contract_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        service_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
    //Struct
    /* 
        Contractsservices.sync({
            force: true
        })
     */
    return Contractsservice;

};