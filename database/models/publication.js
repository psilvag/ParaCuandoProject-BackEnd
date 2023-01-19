'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      
      Publication.belongsTo(models.Category,{as:'Categories',foreignKey:'category_id'})
      Publication.belongsTo(models.City,{as:'Cities',foreignKey:'city_id'})
      Publication.belongsToMany(models.Profile,{through:models.Vote})
      
    }
  }
  Publication.init({
    id:DataTypes.UUID,
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
    modelName: 'Publication',
    tableName:'Publications',
    underscored:true,
    timestamps:true,
    scopes:{
      public_view:{
        attributes:['title','description']
      },
    },
  }
  );
  return Publication;
};