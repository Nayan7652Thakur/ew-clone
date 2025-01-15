import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../redux/userSlice';
import { Loader2 } from "lucide-react"

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState(null); // To display success or error messages

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('https://ew-clone.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        dispatch(getUser(data))
        setMessage('Signup successful! Redirecting...');
        console.log('Success:', data.message);
        navigate('/');
        dispatch()
        // Redirect or clear form
      } else {
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <div className="bg-white shadow-md p-7 max-w-2xl w-full flex flex-col gap-6">
        <h1 className="text-5xl">
          Sign <span>Up</span>
        </h1>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={input.username}
            onChange={changeEventHandler}
            className="p-2 rounded-md border-b border-gray-500 outline-red-400"
          />
          <input
            type="text"
            name="name"
            placeholder="full Name"
            value={input.name}
            onChange={changeEventHandler}
            className="p-2 rounded-md border-b border-gray-500 outline-red-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={changeEventHandler}
            className="p-2 rounded-md border-b border-gray-500 outline-red-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={changeEventHandler}
            className="p-2 rounded-md border-b border-gray-500 outline-red-400"
          />
          {
            loading ? (
              <button className="flex items-center justify-center bg-red-400 rounded-md text-lg p-2">
                <span>  SignUp...  </span> <span><Loader2 className='mr-2 h-4 w-4 animate-spin' /></span>
              </button>

            ) : (
              <button type="submit" className="bg-red-400 rounded-md text-lg p-2">
                Sign <span>Up</span>
              </button>
            )
          }
        </form>
        <Link className='flex gap-2 text-blue-700 hover:underline' to="/login">
          <span className='text-blue-700'>Create an account?</span>
          <span className='text-orange-700'>Go →</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
