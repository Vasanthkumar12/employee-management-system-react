import React from 'react';
import { NavLink } from 'react-router-dom';
import { CircleUserRound, LogOut } from 'lucide-react';

export const NavBar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-200 shadow-md'>
      <div className='flex flex-col items-center lg:ml-10 sm:items-start'>
        <h1 className='text-3xl font-bold'>Empesus</h1>
        <div className='w-full border-t-2 border-gray-400 mt-1'></div>
      </div>

      <div className='flex sm:flex-row items-center gap-4 mt-0 lg:text-2xl w-90 sm:text-1xl'>
        <NavLink to='/create-employee' className='text-blue-600 hover:text-blue-500'>Create Employee</NavLink>
        <LogOut className='cursor-pointer text-gray-700 hover:text-gray-900 lg:h-8 w-8 ml-5 sm:h-5 w-5' />
        <CircleUserRound className='cursor-pointer text-gray-700 hover:text-gray-900 lg:h-8 w-8 ml-5 sm:h-5 w-5' />
      </div>
    </div>
  );
};

