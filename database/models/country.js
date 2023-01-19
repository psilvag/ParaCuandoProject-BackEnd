'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         Country.hasMany(models.Profile,{as:'Profiles',foreignKey:'country_id'})
         Country.hasMany(models.City,{as:'Cities',foreignKey:'country_id'})
    }
  }
  Country.init({
    id:DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
    tableName:'Countries',
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
  return Country;
};