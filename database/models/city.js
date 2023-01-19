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
      City.belongsTo(models.Country,{as:'Countries',foreignKey:'country_id'})
      City.hasMany(models.Publication,{as:'Publications',foreignKey:'city_id'})
    }
  }
  City.init({
    id:DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
    tableName:'Cities',
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