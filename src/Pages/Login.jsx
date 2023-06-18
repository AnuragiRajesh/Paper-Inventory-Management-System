import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../Services/DataServices';

import '../App.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidLoginCredentials,setInvalidLoginCredentials]= useState('')
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Please enter a username');
      isValid = false;
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    // Proceed with login if form is valid
    if (isValid) {
        console.log(email,password)
      // Add your login logic here
      //   console.log(jsonData);
    loginApi({
        Username:email,
        Password:password
      }).then((response) => {
        setInvalidLoginCredentials("login successfully")
        console.log(response.data);
        localStorage.setItem("Access_Token", response.data.token)
        localStorage.setItem("Refresh Token", response.data.refreshToken);
        navigate('/home');
        
        // <Navigate to="/login" />
        // setEmail('');
        // setPassword('');
      })
      .catch((error) => {
        console.log(error.message)
        setInvalidLoginCredentials(error.message)
        setTimeout(() => {
        setInvalidLoginCredentials('')
        }, 3000);
        // console.log(error.response.data.error_description,"koko");
      });
    }
  };

  return (
    <div className="App">
      <form   onSubmit={handleSubmit}>
        <p style={{color:"red"}}>{invalidLoginCredentials}</p>
        <div style={{ display:"inline", justifyContent:"center", margin:"2rem",gap:"10px"}}><img style={{width:"200px"}} src={require('../Assets/SESHASAI-LOGO-OCT-2020.png')} alt="" />
      <h2 style={{display:"inline"}}>PIM'S</h2></div>
       
       <div className='container-form-fields' > <div style={{ width:"100%"}}>
        <input type="text" className='form-fields' value={email} onChange={handleEmailChange} placeholder='Username' />
          {emailError && <p style={{color:"red",marginLeft:"2rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}>{emailError}</p>}
        </div>  
        <div style={{ width:"100%"}}>
          <input className='form-fields' type="password" value={password} onChange={handlePasswordChange} placeholder='Password' />
          {passwordError && <p style={{ color:"red",marginLeft:"2rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}>{passwordError}</p>}</div>
        </div>
         {/* <div style={{paddingLeft:"2rem", paddingTop:'15px' , textAlign:"left"}}><a href='/register'>Don't have an account?</a></div> */}
        <button className='Submit-btn' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;