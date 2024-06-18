const Movie = require('../models/movie.model');
const Artist = require('../models/artist.model');
exports.findAllMovies = async (req, res) => {
  let query = {};

  if (req.query.status === "RELEASED") {
    query.released = true;
  } else if (req.query.status === "PUBLISHED") {
    query.published = true;
  }

  if (req.query.title !== undefined) {
    query.title = { $regex: new RegExp(req.query.title, 'i') };
  }
  if (req.query.genres !== undefined) {
    query.genres = { $in: req.query.genres.split(',') };
  }
  if (req.query.artists !== undefined) {
    const artistFullNames = req.query.artists.split(',');
    const artistObjects = await Artist.find({ 
        $or: artistFullNames.map(name => {
            const [first_name, last_name] = name.split(' ');
            return { first_name, last_name };
        }) 
    });
    const artistIds = artistObjects.map(artist => artist._id);

    query.artists = { $in: artistIds }; 
}

  if (req.query.releaseDateStart !== undefined && req.query.releaseDateEnd !== undefined) {
    const releaseDateStart = new Date(req.query.releaseDateStart);
    const releaseDateEnd = new Date(req.query.releaseDateEnd);

    if (releaseDateStart > releaseDateEnd) {
      return res.status(400).send({ message: "Release date start must be before or equal to release date end." });
    }

    query.release_date = { $gte: releaseDateStart, $lte: releaseDateEnd };
  } else {
    if (req.query.releaseDateStart !== undefined) {
      query.release_date = { $gte: new Date(req.query.releaseDateStart) };
    }
    if (req.query.releaseDateEnd !== undefined) {
      query.release_date = { ...query.release_date, $lte: new Date(req.query.releaseDateEnd) };
    }
  }

  console.log("Query:", query); 

  Movie.find(query)
    .then(data => {
      res.send({ "movies": data });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  if (id.length === 24) {
    Movie.findOne({ _id: id })
      .populate('artists') 
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Movie with id " + id });
        else
          res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Movie with id=" + id });
      });
  } else {
    Movie.findOne({ movieid: id })
      .populate('artists') 
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Movie with id " + id });
        else
          res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Movie with id=" + id });
      });
  }
};

exports.findShows = (req, res) => {
  const id = req.params.id;

  Movie.findOne({ movieid: id })
    .populate('shows') 
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else
        res.send(data.shows || []);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Shows for movie with id=" + id });
    });
};

