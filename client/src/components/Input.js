import React, { Component } from "react";
import axios from "axios";

class Input extends Component {
  state = {
    action: ""
  };

  addTodo = () => {
    const task = { action: this.state.action };
    console.log("adding todossss");

    axios
      .get("api/cats")
      .then((res) => {
        if (res.data) {
          console.log("response,", res.data);
          // this.props.getTodos();
          // this.setState({ action: "" });
        }
      })
      .catch((err) => console.log(err));

    // if (task.action && task.action.length > 0) {
    //   axios
    //     .get("api/todos", task)
    //     .then((res) => {
    //       if (res.data) {
    //         console.log("response,", res.data);
    //         // this.props.getTodos();
    //         // this.setState({ action: "" });
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   console.log("input field required");
    // }
  };

  render() {
    let { action } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={(e) => this.setState({ action: e.target.value })}
          value={action}
        />
        <button onClick={this.addTodo}>add todo</button>
      </div>
    );
  }
}

export default Input;
