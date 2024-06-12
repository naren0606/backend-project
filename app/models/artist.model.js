const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistid: { type: Number },
  first_name: String,
  last_name: String,
  wiki_url: { type: String, default: 'https://www.mongodb.com/mern-stack' },
  profile_url: { type: String, default: 'https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg' },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] 
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
