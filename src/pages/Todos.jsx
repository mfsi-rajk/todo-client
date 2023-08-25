import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import TodoTable from '../components/TodoTable';
import { TodoContext } from '../TodoContext';
import { getAllTodos } from '../services/todo.service';

function Todos() {
  const [todoList, setTodoList] = useState([]);
  const [params, setParams] = useState({});
  useEffect(() => {
    getAllTodos(setTodoList, params);
  }, [params]);

  return (
    <div className='bg-gray-100 h-full'>
      <TodoContext.Provider value={{ todoList, setTodoList, params, setParams }}>
        <Navbar />
        <TodoTable todoList={todoList} />
      </TodoContext.Provider>
    </div>
  );
}

export default Todos;
