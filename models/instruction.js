'use strict';
module.exports = (sequelize, DataTypes) => {
  var instruction = sequelize.define('instruction', {
    instruction: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return instruction;
};