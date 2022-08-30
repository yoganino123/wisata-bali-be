const { user } = require("../models");

const cekUser = (req, res, next) => {
  // if (req.cookies.user === undefined) {
  //   res.status(403).json({ message: `Please login first!` });
  // } else {
  //   if (req.cookies.user.level === "user") {
  next();
  //   } else {
  //     res.status(403).json({ message: `Please login first!` });
  //   }
  // }
};

const cekAdmin = (req, res, next) => {
  // if (req.cookies.user === undefined) {
  //   res.status(403).json({ message: `You are not an admin, please login first!` });
  // } else {
  //   if (req.cookies.user.level === "admin") {
  next();
  //   } else {
  //     res.status(403).json({ message: `You are not an admin, please login first!` });
  //   }
  // }
};

module.exports = { cekUser, cekAdmin };
