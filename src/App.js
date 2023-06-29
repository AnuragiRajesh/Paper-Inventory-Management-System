import Login from './Pages/Login';
import './App.css';
import Home from './Pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext,AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthContext.Consumer>
                {(context) =>
                  context.authenticated ? (
                    <Navigate to="/home" />
                  ) : (
                    <Login handleLogin={context.handleLogin} />
                  )
                }
              </AuthContext.Consumer>
            }
          />
          <Route path="/login" element={<Login  />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
