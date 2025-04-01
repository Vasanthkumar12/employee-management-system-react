import React, { useReducer, useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  image: '',
  name: '',
  email: '',
  phone: '',
  dob: ''
}

const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
const UPDATE_FIELD = 'UPDATE_FIELD'

const empReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state, 
        [action.field]: action.value
      }

    case ADD_EMPLOYEE:
      return {
        ...state,
        date_of_joining: Date.now()
      }

    default:
      return state
  }
}

export const CreateEmployee = () => {
  const [image, setImage] = useState(null);
  const [employee, dispatch] = useReducer(empReducer, initialState)
  console.log(employee, "created employee")
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    dispatch({ type: UPDATE_FIELD, field: e.target.name, value: image })
  }

  const handleChange = (e) => {
    dispatch({
      type: UPDATE_FIELD,
      field: e.target.name,
      value: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: ADD_EMPLOYEE, payload: employee })
    console.log(employee)

    try {
      let res = axios.post("https://empesus-82c47-default-rtdb.firebaseio.com/employees.json", employee)
      navigate('/landing')
    }
    catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col bg-gray-300 p-6 rounded-lg shadow-lg w-80 gap-4'>
        <div className='relative h-20 w-20 rounded-full flex items-center justify-center overflow-hidden'>
          {image ? (
            <img src={image} alt="Profile" className='h-full w-full object-cover rounded-full' />
          ) : (
            <CircleUserRound className='cursor-pointer text-gray-700 hover:text-gray-900 h-full w-full' />
          )}
          <input type="file" name="image" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
        </div>
        <input onChange={handleChange} name="name" type="text" placeholder='Enter name' className='p-2 border rounded-md' />
        <input onChange={handleChange} name="email" type="email" placeholder='Enter email' className='p-2 border rounded-md' />
        <input onChange={handleChange} name="phone" type="tel" placeholder='Enter mobile number' className='p-2 border rounded-md' />
        <input onChange={handleChange} name="dob" type="date" placeholder='Enter your date of birth' className='p-2 border rounded-md' />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>Submit</button>
      </form>
    </div>
  );
};
