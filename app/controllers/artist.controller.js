
const db = require("../models");
const Artist = require('../models/artist.model');

  exports.findAllArtists = (req, res) => {
    Artist.find()
        .then(data => {
          res.send({"artists": data});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Genres."
          });
        });
     };