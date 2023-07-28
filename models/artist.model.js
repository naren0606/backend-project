const mongoose = require('mongoose');

// Define the Artist schema
const artistSchema = new mongoose.Schema({
  artistid: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  wiki_url: { type: String, required: true },
  profile_url: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movie' }],
  // Add any other properties you have in the artist documents
});

// Create the Artist model using the schema
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
