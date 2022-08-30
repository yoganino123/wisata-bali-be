const { user, category, wisata, image, komenRatig } = require("../../models");
const { decryptPw } = require("../../helper/bcyrpt");

class HomeController {
  static async homePage(req, res) {
    try {
      const dataWisata = await wisata.findAll({ include: [category, image] });
      res.status(200).json(dataWisata);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getCategory(req, res) {
    try {
      let categories = await category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getCategoryById(req, res) {
    try {
      const categoryId = +req.params.id;
      const dataWisata = await wisata.findAll({
        where: { categoryId },
        include: [category, image],
      });
      dataWisata.length > 0 ? res.status(200).json(dataWisata) : res.status(404).json({ message: `Not found` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async detail(req, res) {
    try {
      const id = +req.params.id;
      const resWisata = await wisata.findOne({
        where: { id },
        include: [category, image],
      });
      const resKomentar = await komenRatig.findAll({
        where: { wisataId: id },
        include: [user],
      });
      resWisata ? res.status(200).json({ resWisata, resKomentar }) : res.status(404).json({ message: `Not found` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, pass } = req.body;
      const valUser = await user.findOne({ where: { email } });
      if (valUser) {
        const valPw = decryptPw(pass, valUser.pass);
        if (valPw) {
          switch (valUser.level) {
            case "admin":
              res.cookie("user", valUser);
              res.status(200).json({valUser});
              break;
            case "user":
              res.cookie("user", valUser);
              res.status(200).json({valUser});
              break;
            default:
              res.status(400).json({ msg: `Akun bermasalah!` });
              break;
          }
        } else {
          res.status(403).json({ msg: `Password salah!` });
        }
      } else {
        res.status(404).json({ msg: "Email tidak terdaftar!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    try {
      const { nama, email, pass } = req.body;
      const valUser = await user.findOne({ where: { email } });
      if (valUser) {
        res.status(200).json({ msg: `Email sudah terdaftar!` });
      } else {
        const addUser = await user.create({ nama, email, pass });
        res.status(201).json(addUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("user");
      res.status(200).json({ message: `logout` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = HomeController;
