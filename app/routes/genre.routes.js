// Routing means calling the correct api of controller function
// depending upon the client request


module.exports = app => {
    const genres = require("../controllers/genre.controller.js");
    var router = require("express").Router();
    router.get("/", genres.findAllGenres);
    app.use('/api/genres', router);
    };