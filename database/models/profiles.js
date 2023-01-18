'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
      Profiles.belongsTo(models.Users,{as:'users',foreignKey:'user_id'})
      Profiles.belongsTo(models.Roles,{as:'roles',foreignKey:'role_id'})
      Profiles.belongsTo(models.Countries,{as:'countries',foreignKey:'country_id'})
      Profiles.belongsToMany(models.Publications,{through:Votes})
    }
  }
  Profiles.init({
    id:DataTypes.UUID,
    user_id: DataTypes.UUID,
    role_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    code_phone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Profiles',
    tableName:'profiles',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['id']
      },
    },

  });
  return Profiles;
};