import React, { useState } from 'react';
import Button from './Button';
import Search from './Search';
import AddTodoModal from './AddTodoModal';
import clsx from 'clsx';

const Table = ({ tasks }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onModalClose = () => {
    setModalVisible(false);
  };
  return (
    <div className='h-auto md:h-80vh flex items-center justify-center my-10'>
      <div className='w-full md:w-5/6 lg:w-5/6 xl:w-5/6 min-w-min overflow-x-auto bg-white shadow-lg p-4 md:p-6'>
        <AddTodoModal onClose={onModalClose} isOpen={modalVisible} />
        <Search />
        <Button floatRight type='submit' onClick={() => setModalVisible(true)}>
          Add Todo
        </Button>
        <div className='my-4'>
          <ul className='flex flex-col md:flex-row gap-2 md:gap-4 text-lg text-gray-400'>
            <li className='px-3 py-2 hover:bg-blue-400 hover:rounded-3xl hover:text-white'>All</li>
            <li className='px-3 py-2 hover:bg-blue-400 hover:rounded-3xl hover:text-white'>
              Completed
            </li>
            <li className='px-3 py-2 hover:bg-blue-400 hover:rounded-3xl hover:text-white'>
              Incomplete
            </li>
          </ul>
        </div>

        <div class='flex items-center sm:justify-center ml-4 sm:ml-0'>
          <table class='w-full text-sm border-separate border-spacing-y-2'>
            <thead className='text-left'>
              <tr className='tr-class'>
                <th className='td-header-class'>Title and Descripion</th>
                <th className='td-header-class'>Priority</th>
                <th className='td-header-class'>Status</th>
                <th className='td-header-class'>Due Date</th>
                <th className='td-header-class'>Category</th>
                <th className='td-header-class'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr className='tr-class'>
                  <td className='td-class flex flex-col'>
                    <span className='text-lg'>{task.title}</span>
                    <span className='text-sm'>{task.description}</span>
                  </td>
                  <td className='td-class'>
                    <span
                      className={clsx(
                        task.priority === 'low' && 'green-tag',
                        task.priority === 'medium' && 'yellow-tag',
                        task.priority === 'high' && 'red-tag'
                      )}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td class='td-class'>{task.status}</td>
                  <td class='td-class'>{new Date(task.dueDate).toDateString()}</td>
                  <td class='td-class'>{task.category}</td>
                  <td class='td-class'>
                    <span className='flex flex-row gap-3 justify-between'>
                      <button className='bg-green-600 text-white px-4 py-2 rounded-lg'>
                        Mark as Complete
                      </button>
                      <button className='bg-blue-400 text-white px-4 py-2 rounded-lg'>Edit</button>
                      <button className='bg-rose-400 text-white px-4 py-2 rounded-lg'>
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
