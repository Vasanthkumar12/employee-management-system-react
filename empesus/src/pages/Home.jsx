import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='bg-gray-400 min-h-screen flex flex-col items-center justify-center p-4 text-center'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold'>
        Welcome to <span className='text-blue-800 font-bold'>Empesus!</span>
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl mt-6 sm:mt-10'>
        Please register to continue further... <br className='sm:hidden' />
        <Link to='/register' className='text-blue-600 hover:text-blue-500'>
          Click here to Register
        </Link>
      </p>
    </div>
  );
};
