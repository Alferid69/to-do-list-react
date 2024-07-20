import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
  const [todos, setTodos] = useState(function(){
    const items = localStorage.getItem('todos');
    return JSON.parse(items)
  });

  function handleAddTodos(newToDo) {
    setTodos((todos) => [...todos, newToDo]);
    console.log(todos[0]);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleReset() {
    const comfirmDelete = window.confirm("Are you sure you want to clear the list?")
    if(comfirmDelete) setTodos([]);
  }

  useEffect(function(){
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="container mt-5">
      <div className="col-12 bg-secondary p-3">
        <Form onAddTodo={handleAddTodos} />
      </div>
      {todos === null || todos.length < 1 ? null : (
        <div className="bg-success mt-3">
          <ToDoLists
            todos={todos}
            onDelete={handleDelete}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
}

function Form({ onAddTodo }) {
  const [text, setText] = useState("");
  const inputEl = useRef(null)

  const newToDo = {
    id: crypto.randomUUID(),
    text,
  };

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddTodo(newToDo);
    setText("");
  }

  useEffect(function (){
    inputEl.current.focus();
  }, [])

  return (
    <form
      className="form d-flex align-items-center flex-column"
      onSubmit={handleSubmit}
    >
      <h1>Welcome to ToDo list app</h1>
      <div className="col-7 m-4">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={handleChange}
          ref={inputEl}
          required
        />
      </div>
      <div className="col-4">
        <button className="form-control bg-primary text-light">Add</button>
      </div>
    </form>
  );
}

function ToDoLists({ todos, onDelete, onReset }) {
  return (
    <div className="col p-3">
      <ul className="list-group">
        {todos.map((todo) => (
          <ToDo
            text={todo.text}
            onDelete={onDelete}
            
            id={todo.id}
            key={todo.id}
          />
        ))}
        <ToDo />
      </ul>
      <div className="row d-flex align-items-center justify-content-center mt-3">
        <button className="bg-danger col-4 button" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

function ToDo({ text, id, onDelete }) {
  function handleDelete() {
    const comfirmDelete = window.confirm(
      "Are you sure you want to remove the item?"
    );

    if (comfirmDelete) onDelete(id);
  }
  return (
    text && (
      <li
        className="list-group-item d-flex"
        style={{ backgroundColor: "#17a2b8" }}
      >
        <h4>{text}</h4>
        <button className="bg-danger" onClick={handleDelete}>
          ✖️
        </button>
      </li>
    )
  );
}
