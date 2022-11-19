const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/api");
const { MongoClient } = require("mongodb");

require("dotenv").config();

let db;
let app = express();
// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

let bodyParser = require("body-parser");
app.use(bodyParser.json());
// serving react app on same port as express api
app.use(express.static(path.join(__dirname, "client/build")));

let todos = [];

const mongoClient = new MongoClient(process.env.MONGODB_URL);
async function run() {
  try {
    const database = mongoClient.db(process.env.DB_NAME);
    const todos = database.collection('todos');
    const todo = await todos.findOne({name: 'first_todo'})
    console.log('todo inserted! maybe?, todo collection:', todo)
    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await todos.findOne(query);
    // console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}
run().catch(console.dir);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Send user data - used by client.js
app.get("/users", function (request, response) {
  db.collection("users")
    .find()
    .toArray(function (err, users) {
      // finds all entries in the users collection
      console.log("db users maybe:", users);
      response.send(users); // sends users back to the page
    });
});

app.get("/json", function (req, res) {
  const response = "Hello World";
  res.json({
    message: response
  });
});

app.get("/todos", function (req, res) {
  const response = "Hello World";
  console.log("app.get todos!");
  res.json({
    message: response
  });
});

// API routes
app.use("/api", routes);

app.listen(process.env.PORT || 5002, () => {
  console.log(`Server running on port 5002`);
});
