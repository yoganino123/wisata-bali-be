const { user } = require("../../models");

class UserController {
  static async getUser(req, res) {
    try {
      let users = await user.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUserId(req, res) {
    try {
      const id = +req.params.id;
      let getUser = await user.findByPk(id);
      getUser
        ? res.status(200).json(getUser)
        : res.status(404).json({ message: `Not found` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addUser(req, res) {
    try {
      const { nama, email, pass } = req.body;
      const valEmail = await user.findOne({ where: { email } });
      if (valEmail) {
        res.status(200).json({ msg: `Email sudah terdaftar!` });
      } else {
        const addUser = await user.create({ nama, email, pass });
        res.status(201).json(addUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      const delUser = await user.destroy({ where: { id } });
      delUser === 1
        ? res.status(200).json("Deleted!")
        : res.status(404).json("Not found!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      const { level } = req.body;
      const updUser = await user.update({ level }, { where: { id } });
      updUser[0] === 1
        ? res.status(200).json("Updated!")
        : res.status(404).json("Not found!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
