const { komenRatig, wisata, user } = require("../../models");

class komenRatingController {
  static async getKomenRating(req, res) {
    try {
      const komens = await komenRatig.findAll({
        include: [wisata, user],
        attributes: ["id", "wisataId", "userId", "rating", "kometar"],
        order: ["wisataId"],
      });
      res.status(200).json(komens);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getKomenRatingId(req, res) {
    try {
      res.json({ message: `get komentar by id` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addKomenRating(req, res) {
    try {
      // const { wisataId, userId, rating, kometar } = req.body;
      // let addKomen = await komenRatig.create({
      //   wisataId: wisataId,
      //   userId: userId,
      //   rating: rating,
      //   kometar: kometar,
      // });
      res.json({ message: `add komentar by admin` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteKomenRating(req, res) {
    try {
      const id = +req.params.id;
      const delKomen = await komenRatig.destroy({ where: { id } });
      delKomen === 1 ? res.status(200).json("Deleted!") : res.status(404).json("Not found!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateKomenRating(req, res) {
    try {
      res.json({ message: `update komentar by admin` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = komenRatingController;
