'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.Profile,{as:'Profiles',foreignKey:'profile_id'})
      Vote.belongsTo(models.Publication,{as:'Publications',foreignKey:'publication_id'})
    }
  }
  Vote.init({
    publication_id: DataTypes.UUID,
    profile_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Vote',
    tableName:'Votes',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['id','name']
      }
    },
  });
  return Vote;
};