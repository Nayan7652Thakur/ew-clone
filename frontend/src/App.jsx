import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import EditProfile from './components/EditProfile';
import AllUsers from './components/AllUsers';

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/profile/:id', // Profile route
      element: <Profile />, // The parent component (Profile)
    },
    {
      path: '/profile/:id/create', // Profile route
      element: <CreatePost />, // The parent component (Profile)
    },
    {
      path: '/profile/:id/edit', // Profile route
      element: <EditProfile />, // The parent component (Profile)
    },
    {
      path: '/:id/users', // Profile route
      element: <AllUsers />, // The parent component (Profile)
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
