"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class komenRatig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      komenRatig.belongsTo(models.user, {
        foreignKey: "userId",
      });
      komenRatig.belongsTo(models.wisata, {
        foreignKey: "wisataId",
      });
    }
  }
  komenRatig.init(
    {
      wisataId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: `wisataId tidak boleh kosong!`,
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: `userId tidak boleh kosong!`,
          },
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            msg: `rating tidak boleh kosong!`,
          },
        },
      },
      kometar: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `komentar tidak boleh kosong!`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "komenRatig",
    }
  );
  return komenRatig;
};
