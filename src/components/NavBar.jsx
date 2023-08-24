import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../config/axiosConfig';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='bg-blue-500 p-4 drop-shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white font-semibold text-xl'>Todo App</div>
        <ul className='flex space-x-4'>
          <li>
            <span
              className='text-white hover:text-gray-200 cursor-pointer'
              onClick={() => {
                axiosConfig.post('users/logout').then((res) => res.status === 200 && navigate('/'));
              }}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
