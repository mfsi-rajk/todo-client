import React from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

function Search() {
  const onSubmit = (data) => {
    // setIsLoading(true);
    console.log(data);
  };
  const { register, handleSubmit } = useForm();
  return (
    <form className='flex flex-row gap-5' onSubmit={handleSubmit(onSubmit)}>
      <input
        id='search'
        type='search'
        autoComplete='off'
        placeholder='Search Todos'
        //   disabled={disabled}
        {...register('search')}
        className={clsx(
          'form-input block w-52 rounded-md border-0 py-1.6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
        )}
      />
      <Button type='submit'>Search</Button>
    </form>
  );
}

export default Search;
