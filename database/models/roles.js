'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.Profiles,{as:'profiles',foreignKey:'role_id'})
    }
  }
  Roles.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName:'roles',
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
  return Roles;
};