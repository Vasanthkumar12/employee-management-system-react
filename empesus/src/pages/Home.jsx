import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <h1>Welcome to Empesus !</h1>
        <p>please register to continue further more... <Link to='/register'>Register</Link></p>
    </div>
  )
}
