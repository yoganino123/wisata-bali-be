"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wisata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wisata.belongsTo(models.category, {
        foreignKey: "categoryId",
      });
      wisata.hasMany(models.image, {
        foreignKey: "wisataId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      wisata.belongsToMany(models.user, {
        through: models.komenRatig,
        foreignKey: "wisataId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  wisata.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `nama tidak boleh kosong!`,
          },
        },
      },

      alamat: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `alamat tidak boleh kosong!`,
          },
        },
      },
      deskripsi: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: `deskripsi tidak boleh kosong!`,
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
      categoryId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: `category tidak boleh kosong!`,
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (wisata, options) => {
          wisata.rating = 0;
        },
      },
      sequelize,
      modelName: "wisata",
    }
  );
  return wisata;
};
