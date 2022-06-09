import "./style/style.scss";
import React from "react";
import HeaderTodo from "./components/HeaderTodo";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import InProgressTodos from "./components/InProgressTodos";
import DoneTodos from "./components/DoneTodos";
import Logout from "./components/Logout";
import Login from "./components/Login"
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import DatePicker from "./components/DatePicker";


function App() {
  const dispatch = useDispatch();
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const toggleComplete = async (todo, id) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    dispatch(toggleComplete({ id: id, completed: !completed }));
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }

  return (
    <>
    <Login />
  
    <div className="container">
      <div className="card">
        <div className="cardContainer">
         {todos.length > 0 ?  <DatePicker /> : null}
          <AddTodo />
        </div>
        <DragDropContext className="todoContainer" onDragEnd={handleOnDragEnd}>
          <ul>
            <Droppable droppableId="droppableField">
              {(provided) => (
                <li {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.length > 0 ? <HeaderTodo /> : null}

                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {todos.map((todo, index) => {
                            return (
                              <Draggable
                                key={todo.id}
                                draggableId={todo.id}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <TodoList
                                      todo={todo}
                                      toggleComplete={toggleComplete}
                                      handleDelete={handleDelete}
                                      handleEdit={handleEdit}
                                    />
                                  </li>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>

                  {provided.placeholder}
                </li>
              )}
            </Droppable>

            <Droppable droppableId="droppableField">
              {(provided) => (
                <li {...provided.droppableProps} ref={provided.innerRef}>
                  <div>
                    {todos.length > 0 ? (
                      <div className="headerContainer">
                        <img
                          src="https://iconarchive.com/download/i43462/fasticon/easter-rabbits/pink-rabbit.ico"
                          width="50"
                        ></img>
                        <span className="header">In Progress</span>
                      </div>
                    ) : null}

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="items">
                        {(provided) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {todos.map((todo, index) => {
                              return (
                                <Draggable
                                  key={todo.id}
                                  draggableId={todo.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <li
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <InProgressTodos
                                        todo={todo}
                                        toggleComplete={toggleComplete}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                      />
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                  {provided.placeholder}
                </li>
              )}
            </Droppable>
            <li>
              <div>
                {todos.length > 0 ? (
                  <div className="headerContainer">
                    <img
                      src="https://iconarchive.com/download/i43462/fasticon/easter-rabbits/pink-rabbit.ico"
                      width="50"
                    ></img>
                    <span className="header">Done</span>
                  </div>
                ) : null}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="items">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => {
                          return (
                            <Draggable
                              key={todo.id}
                              draggableId={todo.id}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <DoneTodos
                                    todo={todo}
                                    toggleComplete={toggleComplete}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                  />
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </li>
            {todos.length > 0 ?  <Logout /> : null}
          </ul>
        </DragDropContext>
      </div>
    </div>
    </>
  );
}

export default App;
