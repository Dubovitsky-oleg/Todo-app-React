import React from "react";
import TodoForm from "./todoForm";
import Todo from "./Todo";
import "./todoList.css";

export default class TodoList extends React.Component {
  // state - описывает внутрненее состояние компонента, также как prop, только в отличии от state prop нельзя изменять
  state = {
    todos: [],
    todoToShow: "all",
    toggleAllComplete: true
  };

  addTodo = todo => {
    // const newTodos = [todo, ...this.states.todos];

    //setState - обновляет состояние вызова функции
    this.setState({
      todos: [todo, ...this.state.todos]
    });
  };

  toggleComplete = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          // suppose to update
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };

  updateTodoToShow = s => {
    this.setState({
      todoToShow: s
    });
  };

  handleDeleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  removeAllTodosThatAreComplete = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.complete)
    });
  };

  render() {
    let todos = [];
    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todos.filter(todo => todo.complete);
    }
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map(todo => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            id={todo.id}
            todo={todo}
          />
        ))}
        <div>
          {this.state.todos.filter(todo => !todo.complete).length} item left
        </div>
        <a
          href="#"
          className="btn-click"
          onClick={() => this.updateTodoToShow("all")}
        >
          all
        </a>
        <a
          href="#"
          className="btn-click"
          onClick={() => this.updateTodoToShow("active")}
        >
          active
        </a>
        <a
          href="#"
          className="btn-click"
          onClick={() => this.updateTodoToShow("complete")}
        >
          complited
        </a>
        {this.state.todos.some(todo => todo.complete) ? (
          <a
            href="#"
            className="btn-click"
            onClick={this.removeAllTodosThatAreComplete}
          >
            clear complited
          </a>
        ) : null}
        <a
          href="#"
          className="btn-add"
          onClick={() =>
            this.setState({
              todos: this.state.todos.map(todo => ({
                ...todo,
                complete: this.state.toggleAllComplete
              })),
              toggleAllComplete: !this.state.toggleAllComplete
            })
          }
        >
          on/off{" "}
        </a>
      </div>
    );
  }
}
