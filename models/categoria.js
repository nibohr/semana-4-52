"use strict";
const { Model } = require("sequelize");
// const models=require('../models')
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Articulo, { as: "articulos" });
    }
  }
  Categoria.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      estado: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Categoria",
    }
  );
  return Categoria;
};
