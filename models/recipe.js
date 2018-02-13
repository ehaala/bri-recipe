'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return recipe;
};