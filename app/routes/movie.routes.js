// Routing means calling the correct api of controller function
// depending upon the client request

module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
 
    var router = require("express").Router();
    
    router.get("/", movies.findAllMovies);
    router.get("/:id", movies.findOne);
    router.get("/:id/shows", movies.findShows);
    app.use('/api/movies', router);
};