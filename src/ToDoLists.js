import { useContext } from "react";
import { TodoContext } from "./App";
import { ToDo } from "./ToDo";

export function ToDoLists() {
  const { todos, onReset } = useContext(TodoContext);
  return (
    <div className="bg-success mt-3 mb-5">
      <div className="col p-3">
        <ul className="list-group">
          {todos.map((todo) => (
            <ToDo text={todo.text} id={todo.id} key={todo.id} />
          ))}
          <ToDo />
        </ul>
        <div className="row d-flex align-items-center justify-content-center mt-3">
          <button className="bg-danger col-4 button" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
