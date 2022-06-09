import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../style/style.scss";

export default function AddTodo() {
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        date: new Date(),
      });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addingArea">
      <div className="newInput">
        <input
          className="newTodo"
          type="text"
          placeholder="+New"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="addButton">
        <button>Add</button>
      </div>
    </form>
  );
}
