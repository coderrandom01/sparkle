import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Using Navigate for redirection
import { getCookie } from './HelperFunctions/basicHelpers'; // Import getCookie function from your utils or directly in this file

const PrivateRoute = ({ children } : any) => {
  const accessToken = localStorage.getItem('loginUserToken')
  const isAdmin = localStorage.getItem('isAdmin')

  // const accessToken = getCookie('accessToken');

  // If there's no access token, redirect to the login page
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If there's an access token, render the children components
  return children ? children : <Outlet />;
};

export default PrivateRoute;