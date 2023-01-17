'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Publications.hasMany(models.Votes,{as:'votes',foreignKey:'publication_id'})

      Publications.belongsTo(models.Profiles,{as:'profiles',foreignKey:'profile_id'})
      Publications.belongsTo(models.Categories,{as:'categories',foreignKey:'category_id'})
      Publications.belongsTo(models.City,{as:'city',foreignKey:'city_id'})
     
    }
  }
  Publications.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true
    },
    profile_id:DataTypes.UUID,
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    picture: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications',
    tableName:'publications',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['title','description']
      },
    },
  }
  );
  return Publications;
};