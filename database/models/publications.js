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
      // define association here
    }
  }
  Publications.init({
    id: DataTypes.UUID,
    profile_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    picture: DataTypes.STRING,
    city_id: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications',
  });
  return Publications;
};