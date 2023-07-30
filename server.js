const express = require("express");
const cors = require("cors");

// make express object 
const app = express();
app.use(express.json());

// use the CORS object 
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// load the routes for movie 
require("./app/routes/movie.routes")(app);

// load the routes for genre
require("./app/routes/genre.routes")(app);

// load the routes for artist
require("./app/routes/artist.routes")(app);

// load the routes for users
require("./app/routes/user.routes")(app);

// set up a default route for / 
app.get("/", (req, res) => {
  res.json({ message: "Movie booking application" });
});



// set port and listen for requests, something like this :
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
