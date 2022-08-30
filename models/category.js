"use strict";
const { Model } = require("sequelize");
const wisata = require("./wisata");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.hasMany(models.wisata, {
        foreignKey: "categoryId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  category.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `nama tidak boleh kosong!`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
