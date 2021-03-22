import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {fetchTodos, addTodo, deleteTodo} from './actions';

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const handleClick = (id) => dispatch(deleteTodo(id));
  if(!todos || !todos.length){
    return <div> No Todo </div>;
  }else{
    return(
      <ul>
        {todos.map((todo) => <li key={todo.id} onClick={() => handleClick(todo.id)}>{todo.label}</li>)}
      </ul>
    );
  }

};

const TodoInput = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState();
  const handleChange = event => setNewTodo(event.target.value);
  const handleClick = () => {
    dispatch(addTodo({label: newTodo,
      id: Math.ceil(Math.random() * 100),}));
  }
  return(
    <>
      <input value={newTodo} onChange={handleChange} type="text"></input>
      <button onClick= {handleClick} >Add Todo</button>
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ToDo App
        </p>

        <Todos/>
        <TodoInput/>
        
      </header>
    </div>
  );
}

export default App;
