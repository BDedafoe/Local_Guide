'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment}) {
        Drink.hasMany(Comment, { foreignKey: 'place', as: 'comments' })
    }
  }
  Drink.init({
    place: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    drink_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Drink',
  });
  return Drink;
};