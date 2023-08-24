import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
      <div className='bg-gray-100 w-full md:w-2/5 p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Add New Todo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='block text-lg font-medium leading-6 text-gray-900' htmlFor='title'>
            Title
          </label>
          <input
            id='title'
            type='text'
            autoComplete='off'
            placeholder='Enter the title'
            //   disabled={disabled}
            {...register('title')}
            className='input-class'
          />
          <label
            className='block text-lg font-medium leading-6 text-gray-900 mt-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            id='description'
            type='text'
            autoComplete='off'
            placeholder='Enter the description'
            //   disabled={disabled}
            {...register('description')}
            className='input-class'
          />
          <label
            className='block text-lg font-medium leading-6 text-gray-900 mt-2'
            htmlFor='priority'
          >
            Priority
          </label>
          <select name='priority' id='priority' {...register('priority')} className='input-class'>
            <option value='' disabled selected>
              Select Priority
            </option>
            <option value='medium'>Medium</option>
            <option value='low'>Low</option>
            <option value='High'>High</option>
          </select>
          <label
            className='block text-lg font-medium leading-6 text-gray-900 mt-2'
            htmlFor='dueDate'
          >
            Due Date
          </label>
          <input
            id='dueDate'
            name='dueDate'
            type='date'
            autoComplete='off'
            //   disabled={disabled}
            {...register('dueDate')}
            className='input-class'
          />
          <label
            className='block text-lg font-medium leading-6 text-gray-900 mt-2'
            htmlFor='category'
          >
            Category
          </label>
          <select name='category' id='category' {...register('category')} className='input-class'>
            <option value='' disabled selected>
              Select Category
            </option>
            <option value='work'>Work</option>
            <option value='personal'>Personal</option>
            <option value='shopping'>Shopping</option>
            <option value='miscellaneous'>Miscellenous</option>
          </select>
          <button
            onClick={() => onClose()}
            className='bg-rose-500 text-white px-4 py-2 rounded-md my-4 mx-4 float-right'
          >
            Close
          </button>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md my-4 float-right'
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
