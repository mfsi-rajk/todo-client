import React from 'react';
import Navbar from '../components/NavBar';
import TodoTable from '../components/TodoTable';

function Todos() {
  const tasks = [
    {
      title: '1st todo',
      description: 'not nice todo',
      priority: 'high',
      status: 'incomplete',
      dueDate: '2014-01-22T14:56:59.301Z',
      user: '64e4a6acb4fdea7fb7b46cd5',
      category: 'personal',
    },
    {
      title: '1.5 todo',
      description: 'not nice todo',
      priority: 'low',
      status: 'complete',
      dueDate: '2014-01-22T14:56:59.301Z',
      category: 'work',
    },
    {
      title: '2nd todo',
      description: 'not nice todo',
      priority: 'medium',
      status: 'complete',
      dueDate: '2014-01-22T14:56:59.301Z',
      category: 'shopping',
    },
    {
      title: 'first todo',
      description: 'nice todo',
      priority: 'medium',
      status: 'incomplete',
      dueDate: '2014-01-22T14:56:59.301Z',
      category: 'miscellaneous',
    },
  ];
  return (
    <div className='bg-gray-100 h-screen'>
      <Navbar />
      <TodoTable tasks={tasks} />
    </div>
  );
}

export default Todos;
