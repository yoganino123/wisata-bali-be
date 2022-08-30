"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      image.belongsTo(models.wisata, {
        foreignKey: "wisataId",
      });
    }
  }
  image.init(
    {
      wisataId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: `wisataId tidak boleh kosong!`,
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `image tidak boleh kosong!`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "image",
    }
  );
  return image;
};
