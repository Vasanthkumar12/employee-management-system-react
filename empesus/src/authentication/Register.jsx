import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
import { employeeReducer } from "./employeeRegister";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  errors: {},
};

export const Register = () => {
  console.log("Rendering...");
  const [user, dispatch] = useReducer(employeeReducer, initialState);
  const navigate = useNavigate()

  const USERNAME_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{6,}$/
  const PHONE_REGEX = /^\d{10}$/
  

  useEffect(() => {
    const errors = {};

    // if (!user.username.trim()) errors.username = "Username is required!";
    if (user.email && !USERNAME_REGEX.test(user.email))
      errors.email = "Invalid email format!";
    if (
      user.password &&
      !PASSWORD_REGEX.test(user.password)
    )
      errors.password =
        "Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character (!@#$%^&).";
    if (user.confirm_password && user.confirm_password !== user.password)
      errors.confirm_password = "Passwords do not match!";
    if (user.phone && !PHONE_REGEX.test(user.phone))
      errors.phone = "Phone number must be exactly 10 digits!";

    dispatch({ type: "SET_ERRORS", payload: errors });
  }, [user.username, user.email, user.password, user.confirm_password, user.phone]);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_USER_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!user.username.trim()) errors.username = "Username is required!";
    if (!user.email.trim()) errors.email = "Email is required!";
    if (!user.password.trim()) errors.password = "Password is required!";
    if (!user.confirm_password.trim()) errors.confirm_password = "Confirm password is required!";
    if (!user.phone.trim()) errors.phone = "Phone number is required!";

    dispatch({ type: "SET_ERRORS", payload: errors });

    // Prevent submission if errors exist
    if (Object.keys(errors).length > 0) {
      alert("Please fix errors before submitting!");
      return;
    }


    try {
      let response = await axios.post(
        "https://natural-nest-723f4-default-rtdb.firebaseio.com/users.json",
        user
      );

      if (response.status === 200) {
        console.log("User registration successful", user);
        dispatch({ type: "REGISTRATION_SUCCESS" });
        alert("User Registration Successful!");
        navigate('/signin')
      } else {
        console.log("Registration Failed");
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.log("API error", err.message);
      dispatch({ type: "REGISTRATION_FAILURE" });
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-300 px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg outline-0 focus:border-white"
            />
            {user.errors.username && <p className="text-red-300 text-sm">{user.errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg outline-0 focus:border-white"
            />
            {user.errors.email && <p className="text-red-300 text-sm">{user.errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg outline-0 focus:border-white"
            />
            {user.errors.password && <p className="text-red-300 text-sm">{user.errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={user.confirm_password}
              onChange={handleChange}
              placeholder="Confirm password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg outline-0 focus:border-white"
            />
            {user.errors.confirm_password && (
              <p className="text-red-300 text-sm">{user.errors.confirm_password}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium ">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg outline-0 focus:border-white"
            />
            {user.errors.phone && <p className="text-red-300 text-sm">{user.errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="mt-5 p-2 w-full text-white bg-green-500 border-2 border-green-500 font-bold hover:bg-green-600 rounded-md cursor-pointer"
            >
              Register
            </button>
          </div>
          <p className="text-sm text-center mt-4">
             If you already registered before, then{" "}
             <Link
               to="/signin"
               className="text-gray-500 font-medium hover:underline hover:text-gray-400 transition duration-300"
             >
               Sign In
             </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
