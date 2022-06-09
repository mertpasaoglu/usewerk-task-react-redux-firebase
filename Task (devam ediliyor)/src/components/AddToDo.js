import { useSelector } from "react-redux";
import '../style/style.scss';
import { useDispatch } from "react-redux";
import { setItem } from "../stores/addToDoSlice";
import { addData } from "../stores/listSlice";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function AddToDo() {
 
  const { title } = useSelector((state) => state.addToDo);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      //send the item data to db

      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        date: new Date(),
      });

    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="addingArea">
        <div className="newInput">
          <input
            className="newTodo"
            type="text"
            placeholder="+New"
            value={title}
            onChange={(e) => dispatch(setItem(e.target.value))}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "+New")}
          />
        </div>
        <div className="addButton">
          <button onClick={(e) => dispatch(addData(e.target.value))}>Add</button>
        </div>
      </form>
    </div>
  );
}
