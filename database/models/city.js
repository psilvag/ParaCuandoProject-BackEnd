'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.Countries,{as:'countries',foreignKey:'country_id'})
      City.hasMany(models.Publications,{as:'publications',foreignKey:'city_id'})
    }
  }
  City.init({
    id:DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
    tableName:'city',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['id','name']
      },
      no_timestamps:{
        attributes:{
          exclude:['created_at','updated_up']
        }
      },
    },
  });
  return City;
};