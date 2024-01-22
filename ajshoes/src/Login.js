import './Login.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {  useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';




const Login = () => {
  const navigate = useNavigate();
  const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                      console.log(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user]

  );
  console.log(user);
  console.log(profile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login/login', { email, password });
      console.log("response", response);
      console.log("message", response.data.message);
  
      if (response.data) {
        const token = response.data.token;
        console.log("token", token);
        sessionStorage.setItem('token', token);
        const { userType, redirect } = response.data;
        if (userType === 'user' || userType === 'seller') {
          navigate(redirect);
        } else {
          alert('Invalid user type');
        }
      }
      else {
        alert('Invalid response format');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

     

  
     
// useEffect(()=>{
//   console.log("user :",user);
//   console.log("profile:",profile)
// },[user,profile])

  return (
    <div className='container bg'>
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            Login
          </button>
          
          <div>
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
