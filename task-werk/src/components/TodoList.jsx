import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../style/style.scss";
import { useState } from "react";
import PanToolIcon from "@mui/icons-material/PanTool";

export default function TodoList({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newTitle, setNewTitle] = React.useState(todo.title);
  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  const [readOnly, setReadOnly] = useState(true);
  const handleDoubleClick = () => {
    console.log("selam");
    setReadOnly(!readOnly);
  };

  return (
    <div>
      <div className="listItem">
        <PanToolIcon />
        <input
          readOnly={readOnly}
          onDoubleClick={handleDoubleClick}
          id="input"
          className="newTodos"
          type="text"
          value={todo.title === "" ? newTitle : todo.title}
          onChange={handleChange}
        />
        <input type="checkbox" onClick={() => toggleComplete(todo)} />

        <button onClick={() => handleEdit(todo, newTitle)}>
          <EditIcon id="i" />
        </button>
        <button onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}


