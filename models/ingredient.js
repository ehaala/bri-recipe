'use strict';
module.exports = (sequelize, DataTypes) => {
  var ingredient = sequelize.define('ingredient', {
    ingredient: DataTypes.STRING,
    amount: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ingredient;
};