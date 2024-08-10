import { useContext } from "react";
import { TodoContext } from "./App";

export function ToDo({ text, id }) {
  const { onDelete } = useContext(TodoContext);

  function handleDelete() {
    const comfirmDelete = window.confirm(
      "Are you sure you want to remove the item?"
    );

    if (comfirmDelete) onDelete(id);
  }
  return (
    text && (
      <li
        className="list-group-item d-flex mt-1 mb-1"
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
