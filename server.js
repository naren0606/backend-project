const http = require('http');
const db = require("./models"); // Importing the database configuration

const server = http.createServer((req, res) => {
  if (req.url === '/movies') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('All Movies Data in JSON format from Mongo DB');
  } else if (req.url === '/genres') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('All Genres Data in JSON format from Mongo DB');
  } else if (req.url === '/artists') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('All Artists Data in JSON format from Mongo DB');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 9000;

// Connecting to the database before starting the server
db.mongoose
  .connect("mongodb://localhost:27017/moviesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    // Starting the server after successfully connecting to the database
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
