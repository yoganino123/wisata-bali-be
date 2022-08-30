const wisataRoutes = require("express").Router();
const { WisataController } = require("../../controllers");

wisataRoutes.get("/", WisataController.getWisata);
wisataRoutes.get("/:id", WisataController.getWisataId);
wisataRoutes.post("/", WisataController.addWisata);
wisataRoutes.delete("/:id", WisataController.deleteWisata);
wisataRoutes.put("/:id", WisataController.updateWisata);

module.exports = wisataRoutes;
