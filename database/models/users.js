'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Users.hasMany(models.Profiles,{as:'profiles',foreignKey:'user_id'})
    }
  }
  Users.init({
    id:DataTypes.UUID,
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
        
      }
    },
    username: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[2,15]
      }
    },
    email_verified: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName:'users',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['id','first_name']
      },
      no_timestamps:{
        attributes:{
          exclude:['created_at','updated_up']
        }
      },
    },
  }
  );
  return Users;
};