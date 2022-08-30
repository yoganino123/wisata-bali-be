const adminRoute = require("express").Router();
const wisataRoutes = require("./wisata");
const categoryRoutes = require("./category");
const imageRoutes = require("./image");
const komenRatingRoutes = require("./KomenRating");
const userRoutes = require("./user");
const { cekUser, cekAdmin } = require("../../middlewares/cekUserStatus");

adminRoute.get("/", cekAdmin, (req, res) =>
  res.json({ message: "Home Page dashboard admin" })
);
adminRoute.use("/wisata", cekAdmin, wisataRoutes);
adminRoute.use("/categories", cekAdmin, categoryRoutes);
adminRoute.use("/images", cekAdmin, imageRoutes);
adminRoute.use("/komenRating", cekAdmin, komenRatingRoutes);
adminRoute.use("/users", cekAdmin, userRoutes);

module.exports = adminRoute;
