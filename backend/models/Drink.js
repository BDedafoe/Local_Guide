const Sequelize = require('sequelize');
const db = require('../config/database');

const Drink = db.define('drink', {
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

module.exports = Drink;