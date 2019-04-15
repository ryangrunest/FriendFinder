// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Star Wars Characters (DATA)
// =============================================================
let friends = [
  {
    name: 'Ryan',
    photo: 'https://pbs.twimg.com/profile_images/848253287568625668/uBCB2Jfe_400x400.jpg',
    q1: 1,
    q2: 2,
    q3: 3,
    q4: 4,
    q5: 5 
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, 'survey.html'));
});

app.get("/api", function(req, res) {

  return res.json(friends);

// return res.json(false);
});
// app.get('/api/waitlist', function(req, res) {
//   return res.json(waitlist);
// })

// Create New Characters - takes in JSON input
app.post("/api", function(req, res) {
  let newFriend = req.body;
  console.log(newFriend);
  friends.push(newFriend);
  res.json(newFriend);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
