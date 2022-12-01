const Sequelize = require('sequelize');
const db = require('../config/database');

const Drinks = db.define('drinks', {
    place: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    drink_type: {
        type: Sequelize.STRING
    },
})

module.exports = Drinks;