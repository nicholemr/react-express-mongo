const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/api");
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

let db;
let app = express();
let bodyParser = require("body-parser");
let todos = [];

const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Use bodyParser to parse application/x-www-form-urlencoded form data
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database and insert default users into users collection
mongoClient.connect((err) => {
  let dbTodos = [];
  console.log("Connected successfully to database");

  db = mongoClient.db(process.env.DB_NAME);

  // Removes any existing entries in the users collection
  db.collection("todos").deleteMany({ name: { $exists: true } }, function (
    err,
    r
  ) {
    for (let i = 0; i < dbTodos.length; i++) {
      // loop through all default users
      dbTodos.push({ name: todos[i] });
    }
    // add them to users collection
    db.collection("todos").insertMany(dbTodos, function (err, r) {
      console.log("Inserted initial todos");
    });
  });
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

// console.log(process.env.MONGODB_URL);
// DB connection started ***
//Set up default mongoose connection
// var mongoDB = "mongodb://127.0.0.1/test";
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

// serving react app on same port as express api
app.use(express.static(path.join(__dirname, "client/build")));

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

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server running on port 5001`);
});
