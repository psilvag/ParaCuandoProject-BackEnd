'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications.belongsTo(models.Profiles,{as:'profiles',foreignKey:'profile_id'})
      Publications.belongsTo(models.Publications,{as:'publications',foreignKey:'publication_id'})
    }
  }
  Votes.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true
    },
    publication_id: DataTypes.UUID,
    profile_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Votes',
    tableName:'votes',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['id','name']
      }
    },
  });
  return Votes;
};