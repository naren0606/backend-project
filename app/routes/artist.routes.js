const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artist.controller.js");

router.get("/", artistController.findAllArtists);

module.exports = router;
