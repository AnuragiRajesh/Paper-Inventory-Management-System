

import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({ component, isLoggedIn }) => {
    const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null);


  localStorage.getItem("Access_Token")?setIsAuthenticated(true):setIsAuthenticated(false)


  if (!isAuthenticated) {
    // Redirect the user to the login page if they are not authenticated
    return navigate("/login")
  } else {
    // Render the protected component
    return <Route component={component} />;
  }
};
export default ProtectedRoute