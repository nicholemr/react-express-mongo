const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db;
// Initial set of users to populate the database with
var defaultTodos = ["read", "paint", "clean"];
var todos = defaultTodos.slice();

const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// //create schema for todo
// const TodoSchema = new Schema({
//   action: {
//     type: String,
//     required: [true, 'The todo text field is required']
//   }
// })

// //create model for todo
// const Todo = mongoose.model('todo', TodoSchema);

// module.exports = Todo;
module.exports = db;
