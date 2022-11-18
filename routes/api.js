var express = require("express");
var router = express.Router();
// const Todo = require("../models/todo");

router.get("/cats", (req, res, next) => {
  res.send("getting cats finally");

  // this will return all the Data, exposing only the id and action field to the client
  // Todo.find({},'action')
  //     .then(data=>res.json(data))
  //     .catch(next);
});

router.post("/todos", (req, res, next) => {
  // console.log("post /todos", Todo);
  // res.json({ Todo: Todo });
  // if(req.body.action){
  //     Todo.create(req.body)
  //         .then(data=>res.json(data))
  //         .catch(next);
  // }
  // else{
  //     res.json({
  //         error:'The input field is empty'
  //     })
  // }
});

// router.delete("/todos/:id", (req, res, next) => {
//   console.log("deleteing todos");
//   // Todo.findOneAndDelete({'id':req.params.id})
//   // .then(data=>res.json(data))
//   // .catch(next);
// });

module.exports = router;
