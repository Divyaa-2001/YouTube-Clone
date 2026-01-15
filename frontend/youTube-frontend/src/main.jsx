import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import Home from './components/Home.jsx';
import Watch from './components/Watch.jsx';
import Channels from './components/Channel.jsx';
import './index.css'
import Channel from './components/Channel.jsx';
import CreateChannelForm from './components/CreateChannelForm.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/watch/:id',
        element: <Watch />
      },
      {
        path: "/channel",
        element: <Channel />
      },
            {
        path: "/create=channel",
        element: <CreateChannelForm />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
