import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='bg-gray-400 h-screen flex flex-col items-center justify-center'>
        <h1 className='text-6xl'>Welcome to <span className='text-blue-800 font-bold'>Empesus !</span></h1>
        <p className='text-2xl mt-10'>please register to continue further more... <Link to='/register' className='text-blue-600 hover:text-blue-500'>Click here to Register</Link></p>
    </div>
  )
}
