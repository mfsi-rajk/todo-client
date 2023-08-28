import React, { useContext, useEffect, useState } from 'react';
import Button from './Button';
import Search from './Search';
import AddTodoModal from './modals/AddTodoModal';
import clsx from 'clsx';
import DeleteModal from './modals/DeleteModal';
import { editTodo, getAllTodos } from '../services/todo.service';
import { TodoContext } from '../TodoContext';
import Pagination from './Pagination';
import { BiSolidEditAlt } from 'react-icons/bi';
import { BiSort } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';

const Table = ({ todoList }) => {
  const { setTodoList, setParams } = useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [mode, setMode] = useState(null);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const onModalClose = () => {
    setModalVisible(false);
    setDeleteModalVisible(false);
  };

  useEffect(() => {
    setParams((prevState) => {
      return { ...prevState, page: page };
    });
  }, [page]);

  const setSortParams = (value) => {
    switch (value) {
      case 'category':
        setParams((prevState) => {
          return {
            ...prevState,
            sortByCategory: '1',
            sortByDueDate: '',
            sortByPriority: '',
          };
        });
        break;
      case 'priority':
        setParams((prevState) => {
          return {
            ...prevState,
            sortByCategory: '',
            sortByDueDate: '',
            sortByPriority: '1',
          };
        });
        break;
      case 'dueDate':
        setParams((prevState) => {
          return {
            ...prevState,
            sortByCategory: '',
            sortByDueDate: '1',
            sortByPriority: '',
          };
        });
        break;
      default:
        return;
    }
  };

  const isDueDateWithin2Days = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDifference = due - today;
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

    return timeDifference <= twoDaysInMillis;
  };

  return (
    <div className='h-auto md:h-80vh flex items-center justify-center my-10'>
      <div className='w-full md:w-5/6 lg:w-5/6 xl:w-5/6 min-w-min overflow-x-auto bg-white shadow-lg p-4 md:p-6'>
        <AddTodoModal onClose={onModalClose} isOpen={modalVisible} todo={currentTodo} mode={mode} />
        <DeleteModal onClose={onModalClose} isOpen={deleteModalVisible} todoId={todoId} />
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <Search />
          <div className='my-4'>
            <ul className='flex flex-col md:flex-row gap-2 md:gap-4 text-lg text-gray-400'>
              <li
                className={clsx(
                  'px-3 py-2 hover:bg-blue-400 hover:rounded-3xl hover:text-white',
                  status === '' && 'bg-blue-400 rounded-3xl text-white'
                )}
                onClick={() => {
                  setStatus('');
                  setParams((prevState) => {
                    return { ...prevState, filterByStatus: '' };
                  });
                }}
              >
                All
              </li>
              <li
                className={clsx(
                  'px-3 py-2 hover:bg-blue-400 hover:rounded-3xl hover:text-white',
                  status === 'completed' && 'bg-blue-400 rounded-3xl text-white'
                )}
                onClick={() => {
                  setStatus('completed');
                  setParams((prevState) => {
                    return { ...prevState, filterByStatus: 'complete' };
                  });
                }}
              >
                Completed
              </li>
              <li
                className={clsx(
                  'px-3 py-2 hover:bg-blue-400 hover:rounded-3xl hover:text-white',
                  status === 'incompleted' && 'bg-blue-400 rounded-3xl text-white'
                )}
                p
                onClick={() => {
                  setStatus('incomplete');
                  setParams((prevState) => {
                    return { ...prevState, filterByStatus: 'incomplete' };
                  });
                }}
              >
                Incomplete
              </li>
            </ul>
          </div>
          <Button
            floatRight
            type='submit'
            onClick={() => {
              setModalVisible(true);
              setMode('add');
            }}
          >
            Add New Todo
          </Button>
        </div>

        <div class='flex items-center sm:justify-center ml-4 sm:ml-0'>
          <table class='w-full text-sm border-separate border-spacing-y-2'>
            <thead className='text-left'>
              <tr className='tr-class'>
                <th className='td-header-class'>Title</th>
                <th className='td-header-class flex flex-row items-center gap-2'>
                  Priority{' '}
                  <BiSort
                    title='Sort by Priority'
                    className='hover:scale-125'
                    onClick={() => setSortParams('priority')}
                  />
                </th>
                <th className='td-header-class'>Status </th>
                <th className='td-header-class flex flex-row items-center gap-2'>
                  Due Date{' '}
                  <BiSort
                    title='Sort by Priority'
                    className='hover:scale-125'
                    onClick={() => setSortParams('dueDate')}
                  />
                </th>
                <th className='td-header-class'>
                  <div className='flex flex-row items-center gap-2'>
                    <p>Category</p>
                    <BiSort
                      title='Sort by Priority'
                      className='hover:scale-125'
                      onClick={() => setSortParams('category')}
                    />
                  </div>
                  <p></p>
                </th>
                <th className='td-header-class'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todoList &&
                todoList.todos &&
                todoList.todos.length > 0 &&
                todoList.todos.map((task) => (
                  <tr className='tr-class' key={task._id}>
                    <td className='td-class'>
                      <div className='text-lg'>{task.title}</div>
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
                    <td class='td-class text-lg'>{task.status}</td>
                    <td class='td-class'>
                      <span
                        className={clsx(
                          `text-lg`,
                          isDueDateWithin2Days(task.dueDate) ? 'text-red-500' : 'text-blue-500'
                        )}
                      >
                        {new Date(task.dueDate).toDateString()}
                      </span>
                    </td>

                    <td class='td-class text-lg'>{task.category}</td>
                    <td class='td-class'>
                      <span className='flex flex-row justify-between'>
                        {task.status === 'incomplete' ? (
                          <TiTick
                            className='h-7 w-7 hover:scale-125'
                            title='Mark as completed'
                            onClick={() => {
                              editTodo(task._id, {
                                status: 'complete',
                              });
                              getAllTodos(setTodoList);
                            }}
                          />
                        ) : (
                          <RxCross2
                            className='h-7 w-7 hover:scale-125'
                            title='Mark as Incomplete'
                            onClick={() => {
                              editTodo(task._id, {
                                status: 'incomplete',
                              });
                              getAllTodos(setTodoList);
                            }}
                          />
                        )}

                        <BiSolidEditAlt
                          className='h-7 w-7 hover:scale-125'
                          title='Edit Todo'
                          onClick={() => {
                            setModalVisible(true);
                            setMode('edit');
                            setCurrentTodo(task);
                          }}
                        />

                        <AiFillDelete
                          className='h-7 w-7 hover:text-rose-600 hover:scale-125'
                          title='Delete Todo'
                          onClick={() => {
                            setTodoId(task._id);
                            setDeleteModalVisible(true);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={todoList.currentPage}
          totalPages={todoList.totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Table;
