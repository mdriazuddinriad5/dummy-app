import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/Layout';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import AuthProvider from './page/provider/AuthProvider';
import PrivateRoute from './Routes/PrivateRoute';
import ErrorPage from './page/ErrorPage/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: 'home',
        element: <PrivateRoute><Home /></PrivateRoute>
      },
      {
        path: '/',
        element: <Login />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <div className='max-w-7xl mx-auto my-10'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>,
)
