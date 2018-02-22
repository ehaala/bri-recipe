'use strict';
module.exports = (sequelize, DataTypes) => {
  var image = sequelize.define('image', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return image;
};