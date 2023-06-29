import React, { createContext, useState,useEffect } from 'react';
import { loginApi } from '../Services/DataServices';
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    uprodunit: '',
    user: '',
    role: ''
  });
  useEffect(() => {
    if ( localStorage.getItem('userData')) {
        return  setAuthenticated(true);
    }else{
     return   setAuthenticated(false);
    }
  }, []);


  const handleLogin = (userrData) => {
    loginApi(userrData)
      .then((response) => {
        const { uprodunit, user, role, token, refreshToken } = response.data;
        localStorage.setItem('Access_Token', token);
        localStorage.setItem('Refresh_Token', refreshToken);

        setUserData((prevUserData) => ({
          uprodunit,
          user,
          role
        }));

        localStorage.setItem('userData', JSON.stringify({
            uprodunit,
            user,
            role
          }));
        setAuthenticated(true);
        console.log(userData, 'ooooo');
      })
      .catch((error) => {
        setAuthenticated(false);
        localStorage.removeItem("userData")
        setUserData({
          uprodunit: '',
          user: '',
          role: ''
        });
      });

  };
  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated,userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
