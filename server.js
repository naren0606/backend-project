const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const movieRoutes = require("./app/routes/movie.routes");
const genreRoutes = require("./app/routes/genre.routes");
const artistRoutes = require("./app/routes/artist.routes");
const userRoutes = require("./app/routes/user.routes");
const db = require("./app/models");

dotenv.config();

// CORS options
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN.split(','),
// };

const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true, // allow credentials (e.g. cookies) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  headers: ['Content-Type', 'Authorization'] // allowed HTTP headers
};


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes"
});

// Middlewares
const app = express();
app.use(helmet());
app.use(limiter); 
app.use(morgan('combined')); 
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// MongoDB Connection
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

// Routes
// app.use("/api/movies", movieRoutes);
// app.use("/api/genres", genreRoutes);
// app.use("/api/artists", artistRoutes);
// app.use("/api/auth", userRoutes);

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Log route registrations
console.log("Registering routes...");
app.use("/api/movies", (req, res, next) => {
  console.log("Movies route hit");
  next();
}, movieRoutes);
app.use("/api/genres", (req, res, next) => {
  console.log("Genres route hit");
  next();
}, genreRoutes);
app.use("/api/artists", (req, res, next) => {
  console.log("Artists route hit");
  next();
}, artistRoutes);
app.use("/api/auth", (req, res, next) => {
  console.log("Auth route hit");
  next();
}, userRoutes);
console.log("Routes registered.");


app.get("/", (req, res) => {
  res.json({ message: "Movie booking application" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
