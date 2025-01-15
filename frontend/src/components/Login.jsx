import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../redux/userSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('https://ew-clone.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(getUser(data?.user)); // Storing the user data in Redux
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <div className="bg-white shadow-md p-7 max-w-2xl w-full flex flex-col gap-6">
        <h1 className="text-5xl">
          LOG <span>In</span>
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
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
              <button type="submit" className="flex items-center justify-center bg-red-400 rounded-md text-lg p-2">
               <span>Login...</span>  <span> <Loader2 className='mr-2 h-4 w-4 animate-spin' /></span>
              </button>
            ) : (

              <button type="submit" className="bg-red-400 rounded-md text-lg p-2">
                <span className='font-bold text-white'>Log</span><span className='text-black font-bold'>In</span>
              </button>
            )
          }
        </form>
        <Link className='flex gap-2 text-blue-700 hover:underline' to="/signup">
          <span className='text-blue-700'>Create an account?</span>
          <span className='text-orange-700'>Go →</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
