"use strict";
const { Model } = require("sequelize");

const { encryptPw } = require("../helper/bcyrpt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.wisata, {
        through: models.komenRatig,
        foreignKey: "userId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  user.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `nama tidak boleh kosong!`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `email tidak boleh kosong!`,
          },
        },
      },
      pass: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `pass tidak boleh kosong!`,
          },
        },
      },
      level: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `level tidak boleh kosong!`,
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.level = "user";
          user.pass = encryptPw(user.pass);
          user.image = null;
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
