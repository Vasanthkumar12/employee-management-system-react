import axios from 'axios'
import React, { useEffect, useReducer } from 'react'

const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES'

const initialState = {
  employees: []
}

const empReducer = (state, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        ...state, employees: [...state.employees, action.payload]
      }
    default:
      return state
      
  }
}

export const Landing = () => {
  const [employeesList, dispatch] = useReducer(empReducer, initialState)
  const employeesArray = Object.values(employeesList.employees).flatMap(emp => Object.values(emp));
  console.log(employeesArray, "resArr");
  const fetchEmployees = async() => {
    try {
      let res = await axios.get("https://empesus-82c47-default-rtdb.firebaseio.com/employees.json")
      // console.log(res.data, "===== Employees")
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data })
    }
    catch(err) {
      console.log(err.message)
    }
  } 

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-6">Landing Page</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {employeesArray.map((emp, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-lg font-semibold text-gray-700"><strong>Name:</strong> {emp.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {emp.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {emp.phone}</p>
          <p className="text-gray-600"><strong>DOB:</strong> {emp.dob}</p>
        </div>
      ))}
    </div>
  </div>
  
  )
}
