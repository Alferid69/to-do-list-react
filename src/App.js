import { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToDoLists } from "./ToDoLists";
import { Form } from "./Form";
import { Footer } from "./Footer";

export const TodoContext = createContext();

export default function App() {
  const [todos, setTodos] = useState(function () {
    const items = localStorage.getItem("todos");
    return JSON.parse(items);
  });

  if (todos === null) setTodos([]);

  function handleAddTodos(newToDo) {
    setTodos((todos) => [...todos, newToDo]);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleReset() {
    const comfirmDelete = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (comfirmDelete) setTodos([]);
  }

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );

  return (
    <TodoContext.Provider
      value={{
        onAddTodo: handleAddTodos,
        todos,
        onDelete: handleDelete,
        onReset: handleReset,
      }}
    >
      <div className="container pt-2">
        <Form onAddTodo={handleAddTodos} />
        {todos === null || todos.length < 1 ? null : (
          <ToDoLists
            todos={todos}
            onDelete={handleDelete}
            onReset={handleReset}
          />
        )}
        <Footer />
      </div>
    </TodoContext.Provider>
  );
}
