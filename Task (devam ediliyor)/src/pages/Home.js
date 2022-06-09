import Date from "../components/Date";
import AddToDo from "../components/AddToDo";
import List from "../components/List";
import Logout from "../components/Logout";
import Header from "../components/Header";
import Item from "../components/Item";
import '../style/style.scss';

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <div className="cardContainer">
          <Date />
          <AddToDo />
          <List />
      
        </div>
        <Logout />
      </div>
    </div>
  );
}
