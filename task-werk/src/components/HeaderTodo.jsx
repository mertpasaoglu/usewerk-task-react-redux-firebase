import React from "react";
import "../style/style.scss";

export default function HeaderTodo() {
  return (
    <div className="headerContainer">
      <img
        src="https://iconarchive.com/download/i43462/fasticon/easter-rabbits/pink-rabbit.ico"
        width="50"
      ></img>
      <span className="header">To do</span>
    </div>
  );
}
