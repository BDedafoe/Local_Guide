const Sequelize = require('sequelize');
const db = require('../config/database');

const Food = db.define('foods', {
    place: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    cuisine: {
        type: Sequelize.STRING
    },
})

module.exports = Food;