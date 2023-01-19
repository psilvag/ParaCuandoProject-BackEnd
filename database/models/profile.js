'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
      Profile.belongsTo(models.User,{as:'users',foreignKey:'user_id'})
      Profile.belongsTo(models.Rol,{as:'rols',foreignKey:'role_id'})
      Profile.belongsTo(models.Country,{as:'countries',foreignKey:'country_id'})
      Profile.belongsToMany(models.Publication,{as:'votes_profiles',through:models.Vote,foreignKey:'profile_id'})
    }
  }
  Profile.init({
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
    modelName: 'Profile',
    tableName:'profiles',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['id']
      },
    },

  });
  return Profile;
};