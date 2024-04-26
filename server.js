const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const movieRoutes = require("./app/routes/movie.routes");
const genreRoutes = require("./app/routes/genre.routes");
const artistRoutes = require("./app/routes/artist.routes");
const userRoutes = require("./app/routes/user.routes");
const db = require("./app/models");

dotenv.config();

var corsOptions = {
  origin: "http://localhost:3000"
};

// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//MongoDB Connection
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

//Routes
app.use("/api/movies", movieRoutes);
app.use("/genres", genreRoutes);
app.use("/artists", artistRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Movie booking application" });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});