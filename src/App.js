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

// import { useNavigate } from 'react-router-dom';



function App() {
  // const navigate = useNavigate();
  const [authenticated, setIsAuthenticated] = useState(false);
  console.log("Auth State ",authenticated)


  const handleLogout = () => {
    localStorage.clear()
        // navigate("/")
        setIsAuthenticated(false);
        // Logout logic
        // handleCloseMenu();
      };
  // Function to handle login
  const handleLogin = () => {
    console.log("After Login State", authenticated)
    // const Secret_key = `JWTRefreshTokenHIGHsecuredPasswordVVVp1OH7Xzyr`
    const token =localStorage.getItem('Access_Token')
    console.log(token,"token ")
    if (token) {
      setIsAuthenticated(true);
      return true
    } else {
      // debugger
      setIsAuthenticated(false);
      return false
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Navigate to="/home" /> : <Login handleLogin={handleLogin}  />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/home" element={ <Home handleLogin={handleLogin}/>} />
      </Routes>
    </Router>
  );
}

export default App;
