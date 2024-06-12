const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller.js");

router.get("/", movieController.findAllMovies);
router.get("/:id", movieController.findOne);
router.get("/:id/shows", movieController.findShows);

module.exports = router;
