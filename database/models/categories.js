'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Categories.hasMany(models.Publications,{as:'publications',foreignKey:'category_id'})
    }
  }
  Categories.init({
    id:DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
    tableName:'categories',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['name','description']
      }
    },
  });
  return Categories;
};