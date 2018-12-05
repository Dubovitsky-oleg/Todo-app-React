import React from "react";
import "./todo.css";

export default props => (
  <div>
    <div
      className="text"
      style={{
        textDecoration: props.todo.complete ? "line-through" : ""
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>

    <a href="#" className="btn-delete" onClick={props.onDelete}>
      x
    </a>
  </div>
);
