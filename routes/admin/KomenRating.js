const komenRatingRoutes = require("express").Router();
const { KomenRatingController } = require("../../controllers");

komenRatingRoutes.get("/", KomenRatingController.getKomenRating);
komenRatingRoutes.get("/:id", KomenRatingController.getKomenRatingId);
komenRatingRoutes.post("/", KomenRatingController.addKomenRating);
komenRatingRoutes.delete("/:id", KomenRatingController.deleteKomenRating);
komenRatingRoutes.put("/:id", KomenRatingController.updateKomenRating);

module.exports = komenRatingRoutes;
