import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your CSS file
import { useState } from 'react';
import axios from 'axios';


const SignUp =()=>{
  const navigation =useNavigate();
  const navigateToLogin =()=>{
    navigation("/");
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(''); 

  const handleonchangeUsername=(event)=>{
    setUsername(event.target.value)
    }
  const handleonchangePassword=(event)=>{
    setPassword(event.target.value)

    }

  const handleonchangeEmail=(event)=>{
    setEmail(event.target.value)
    }

    const signUpclicked = async (e)=>{
     // handleSignUpButton(username,password,email)
      e.preventDefault();
      setMsg(''); // Reset error message
    try {
      let body = {
        username,
        password,
        email
      };

     // let test =JSON.stringify(body)
      const response = await axios.post("https://localhost:44332/RegisterUser", body
        , {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

      // Check if login was successful and navigate
      if (response.data.status == true) {
        setMsg(response.data.message);
        
       // navigate('/'); 
      } else {
        setMsg(response.data.message); 
      }

    } 
    catch (error) {
        setMsg('Some error occured, please try again later.');
        console.error('Error fetching data:', error);
    }
    
    const timeout = setTimeout(() => {
      navigation('/');
    }, 2000);
    return () => clearTimeout(timeout);  
    }


  return (
    <>
        <div className="popup" id="successPopup">
        <div className="popup-content">
        </div>
    </div>
    <div className="signup-container">
        <div className="signup-box">
            <div className="signup-header">
                <h1>Create Your ARVenture Account</h1>
                <p>Join us in the augmented world</p>
            </div>
            <div className="signup-form">
            {msg && <p className="error-message">{msg}</p>} 

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="sign_username" name="username" onChange={handleonchangeUsername} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="sign_email" name="email" onChange={handleonchangeEmail} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="sign_password" name="password" onChange={handleonchangePassword} required/>
                </div>
                <button id="Signupbtn" className="signup-button" onClick={signUpclicked}>Sign Up</button>
            </div>
            <div className="signup-footer">
                { <p>Already have an account? <a onClick={navigateToLogin}>Login</a></p> }
            </div>
        </div>
    </div>
    </>
  )


}

export default SignUp;