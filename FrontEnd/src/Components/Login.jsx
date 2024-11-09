import React, { useState } from 'react';
import './login.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const logInClicked = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      let body = {
        username,
        password,
      };

      let test =JSON.stringify(body)
      const response = await axios.post("https://localhost:44332/login", test
        , {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

      // Check if login was successful and navigate
      if (response.data.status) {
        sessionStorage.setItem('UserId', response.data.user.userId);
        sessionStorage.setItem('userName', response.data.user.userName);
        sessionStorage.setItem('userEmail', response.data.user.email);
        navigate('/HomePage'); // Navigate after successful login
      } else {
        setError('Invalid credentials'); // Handle invalid login
      }
    } catch (error) {
      if(error.response.data="Invalid username or password"){
        setError('Invalid username or password');
      }
      else{
        setError('Some error occured, please try again later.');
        console.error('Error fetching data:', error);
      }  
    }
  };

  const navigateToSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome to ARVenture</h1>
          <p>Your portal to the augmented world</p>
        </div>
        <div className="login-form">
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button id="Loginbtn" className="login-button" onClick={logInClicked}>Login</button>
        </div>
        <div className="login-footer">
          <p>
            <a href="#">Forgot Password?</a>
          </p>
          <p>
            Don't have an account?{' '}
            <a onClick={navigateToSignUp}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
