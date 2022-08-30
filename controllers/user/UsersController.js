const { category, user, wisata, image, komenRatig } = require("../../models");
const { encryptPw } = require("../../helper/bcyrpt");

class UsersController {
  static async userPage(req, res) {
    try {
      // const cookies = req.cookies;
      const dataWisata = await wisata.findAll({ include: [category, image] });
      // let resUser = await user.findByPk(+cookies.user.id);
      res.status(200).json({ dataWisata });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async detail(req, res) {
    try {
      const wisataId = +req.params.id;
      const { userId } = req.body;
      const resWisata = await wisata.findOne({
        where: { id: wisataId },
        include: [category, image],
      });
      const resAllKomentar = await komenRatig.findAll({
        where: { wisataId },
        include: [user],
      });
      const userKomentar = await komenRatig.findOne({
        where: { userId, wisataId },
      });
      let resUserKomentar = {};
      userKomentar
        ? (resUserKomentar = userKomentar)
        : (resUserKomentar = {
            wisataId,
            userId,
            rating: 0,
            kometar: "Belum Ada Ulasan",
          });

      resWisata
        ? res.status(200).json({ resWisata, resAllKomentar, resUserKomentar })
        : res.status(404).json({ message: `Not found` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addKomentar(req, res) {
    try {
      const wisataId = +req.params.id;
      const { userId, rating, kometar } = req.body;
      const valUser = await komenRatig.findOne({ where: { userId, wisataId } });
      if (valUser) {
        res
          .status(200)
          .json({ message: `User sudah menambahkan komentar di wisata ini!` });
      } else {
        const addKomentar = await komenRatig.create({
          wisataId,
          userId,
          rating,
          kometar,
        });
        const jmlRating = await komenRatig.findAll({ where: { wisataId } });
        let hasil = 0;
        jmlRating.forEach((rat) => {
          hasil += rat.rating;
        });
        const newRating = hasil / jmlRating.length;
        await wisata.update({ rating: newRating }, { where: { id: wisataId } });
        res.json({ addKomentar });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateKomentar(req, res) {
    try {
      const wisataId = +req.params.id;
      const { userId, rating, kometar } = req.body;
      const updKomentar = await komenRatig.update(
        { rating, kometar },
        { where: { wisataId, userId } }
      );
      if (updKomentar[0] !== 0) {
        const jmlRating = await komenRatig.findAll({ where: { wisataId } });
        let hasil = 0;
        jmlRating.forEach((rat) => {
          hasil += rat.rating;
        });
        const newRating = hasil / jmlRating.length;
        await wisata.update({ rating: newRating }, { where: { id: wisataId } });
        res.status(201).json({ message: `Updated!` });
      } else {
        res.status(404).json({ message: `Not found!` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteKomentar(req, res) {
    try {
      const wisataId = +req.params.id;
      const { userId } = req.body;
      const delKomentar = await komenRatig.destroy({
        where: { userId, wisataId },
      });
      const jmlRating = await komenRatig.findAll({ where: { wisataId } });
      let hasil = 0;
      jmlRating.forEach((rat) => {
        hasil += rat.rating;
      });
      const newRating = hasil / jmlRating.length;
      await wisata.update({ rating: newRating }, { where: { id: wisataId } });
      delKomentar === 1
        ? res.status(200).json({ msg: "Deleted!" })
        : res.status(404).json({ msg: "Not found!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getProfile(req, res) {
    try {
      const { id } = req.body;
      let resUser = await user.findByPk(id);
      res.status(200).json(resUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updProfile(req, res) {
    try {
      const { id, nama, emailCookie, email, pass } = req.body;
      const images = req.file.path;
      const encryptPass = encryptPw(pass);
      const valUser = await user.findOne({ where: { email: emailCookie, id } });
      const valEmailBaru = await user.findAll({ where: { email } });
      if (valUser) {
        if (valEmailBaru.length === 0 || email === emailCookie) {
          const updUser = await user.update(
            { nama, email, pass: encryptPass, image: images },
            { where: { id } }
          );
          const userBaru = await user.findOne({ where: { email, id } });
          updUser[0] === 1
            ? res.status(200).json({ userBaru, msg: "Updated!" })
            : res.status(404).json({ msg: "Not found!" });
        } else {
          res
            .status(200)
            .json({ message: `Email baru sudah terdaftar di aplikasi!` });
        }
      } else {
        res.status(404).json({ message: `Data user tidak ada!` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getCategoryById(req, res) {
    try {
      const categoryId = +req.params.id;
      const dataWisata = await wisata.findAll({
        where: { categoryId },
        include: [category, image],
      });
      dataWisata.length > 0
        ? res.status(200).json(dataWisata)
        : res.status(404).json({ message: `Not found` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UsersController;
