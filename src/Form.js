import { useContext, useState, useRef, useEffect } from "react";
import { TodoContext } from "./App";

export function Form() {
  const { onAddTodo } = useContext(TodoContext);

  const [text, setText] = useState("");
  const inputEl = useRef(null);

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

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <div className="col-12 bg-secondary p-3">

    <form
      className="form d-flex align-items-center flex-column"
      onSubmit={handleSubmit}
      >
      <h1>Welcome to ToDo List App</h1>
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
          </div>
  );
}
