import React from 'react';
import { removeTodo, getAllTodos } from '../../services/todo.service';
import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';

const DeleteModal = ({ isOpen, onClose, todoId }) => {
  const {setTodoList} = useContext(TodoContext);
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
      <div className='bg-white w-96 p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Confirm Deletion</h2>
        <p className='mb-6 text-gray-600'>Are you sure you want to delete this item?</p>
        <div className='flex justify-end'>
          <button
            onClick={() => {
              removeTodo(todoId);
              getAllTodos(setTodoList);
              onClose();
            }}
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2'
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
