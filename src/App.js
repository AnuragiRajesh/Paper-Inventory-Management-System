import Login from './Pages/Login';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  console.log("Auth State ",authenticated)

  useEffect(() => {
    // Perform initial authentication check when the component mounts
    // handleLogin();
  }, []);

  // Function to handle login
  const handleLogin = () => {
    console.log("After Login State", authenticated)
    const Secret_key = `JWTRefreshTokenHIGHsecuredPasswordVVVp1OH7Xzyr`
    const token =localStorage.getItem('Access_Token')
    if (token) {
      setAuthenticated(true);
      return true
    } else {
      setAuthenticated(false);
      return false
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={handleLogin ? <Navigate to="/home" /> : <Login  />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={handleLogin ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
