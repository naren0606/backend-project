const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre.controller.js");

router.get("/", genreController.findAllGenres);

module.exports = router;
