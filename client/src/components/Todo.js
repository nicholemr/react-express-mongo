import React, { useEffect, useState } from "react";
import axios from "axios";

import Input from "./Input";
import ListTodo from "./ListTodo";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    console.log("getting todos");
    axios
      .get("/todos")
      .then((res) => {
        console.log("todos returned:", res);
        if (res.data) {
          setTodos(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then((res) => {
        if (res.data) {
          getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>My Todo(s)</h1>
      <Input getTodos={getTodos} />
      <ListTodo todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}
