'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment}) {
        Food.hasMany(Comment, { foreignKey: 'place', as: 'comments' })
    }
  }
  Food.init({
    place: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    cuisine: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};

// const Sequelize = require('sequelize');
// const db = require('../config/config');

// const Food = db.define('foods', {
//   place: {
//     type: Sequelize.STRING
//   },
//   city: {
//     type: Sequelize.STRING
//   },
//   state: {
//     type: Sequelize.STRING
//   },
//   cuisine: {
//     type: Sequelize.STRING
//   }
// });

// Food.sync().then(() => {
//   console.log('table created');
// });
// module.exports = Food;