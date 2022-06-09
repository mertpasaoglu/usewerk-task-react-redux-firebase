import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData, setToggle } from "../stores/listSlice";
import "../style/style.scss";
import PanToolIcon from "@mui/icons-material/PanTool";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from 'react';


export default function Item(props) {
  

  const dispatch = useDispatch();

  const index = useSelector((state) => state.list).findIndex(
    (item) => item.id == props.id
  );
  const list = useSelector((state) => state.list);
  const { id, title, tic } = list[index];

  const saveHandler = (e) => {
    //saves the item value to the db
  };

  const deleteHandler = (e) => {
    //deletes the item from the db
  };

  return (
    <div>
      <PanToolIcon />
      <input
        className="newTodos"
        value={title}
        type="text"
        onChange={(e) => dispatch(setData({ id: id, title: e.target.value }))}
      />
      <input
        checked={tic}
        type="checkbox"
        onChange={(e) => dispatch(setToggle(id))}
      />

      <button onClick={saveHandler}><EditIcon id="i"/></button>
      <button onClick={deleteHandler}><DeleteIcon id="i"/></button>
    </div>
  );
}
