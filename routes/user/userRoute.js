const userRoute = require("express").Router();
const { UsersController } = require("../../controllers");
const upload = require("../../middlewares/uploadImage");
const { cekUser, cekAdmin } = require("../../middlewares/cekUserStatus");

// userRoute.get("/", (req, res) => res.json({ message: `user` }));
userRoute.get("/", cekUser, UsersController.userPage);
userRoute.post("/wisata/:id", cekUser, UsersController.detail);
userRoute.get("/category/:id", cekUser, UsersController.getCategoryById);
userRoute.post("/wisata/addKomentar/:id", cekUser, UsersController.addKomentar);
userRoute.put("/wisata/:id", cekUser, UsersController.updateKomentar);
userRoute.delete("/wisata/:id", cekUser, UsersController.deleteKomentar);
userRoute.post("/profile", cekUser, UsersController.getProfile);
userRoute.put(
  "/profile",
  cekUser,
  upload.single("images"),
  UsersController.updProfile
);

module.exports = userRoute;
