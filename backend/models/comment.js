'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Drink, Food }) {
      Comment.belongsTo(User, { as: 'author', foreignKey: 'first_name' })
    

    }
  }
  Comment.init({
    commentID: DataTypes.SMALLINT,
    authorID: DataTypes.STRING,
    place: DataTypes.STRING,
    first_name: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};