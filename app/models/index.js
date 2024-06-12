// load the db.config.js file 
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

// set up the database object 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.movies = require("./movie.model.js")(mongoose);

db.users = require("./user.model.js")(mongoose);

db.artists = require("./artist.model.js")(mongoose);

db.genres = require("./genre.model.js")(mongoose);

module.exports = db;

