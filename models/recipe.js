'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.recipe.hasMany(models.instruction);
        models.recipe.hasMany(models.ingredient);
      }
    }
  });
  return recipe;
};