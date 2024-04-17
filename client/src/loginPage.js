

import React, { useState } from 'react';

import axios from 'axios';


const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [contact, setContact] = useState("")
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const isAuthenticated = true; // need to verify from the databse
      if(isAuthenticated) {
        onLogin(true); // Inform App component about successful login

        // updateContact function is responsible for sending the user's email and password to the backend for authentication. 
        // It's used when a user submits their login credentials. (user authentication)
        const updateContact = {
          email: email,
          password: password
        }
        const response = await axios.post('/contacts', { contact: updateContact });
        console.log(response.data)
        //localStorage.setItem('userInfo', credentialsJson);

      } else {
        alert('Login Failed');
      }
    };
  
    // Inline styles
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', 
    };
  
    const inputStyle = {
      marginBottom: '10px', 
      padding: '10px', 
      border: '2px solid black', 
      borderRadius: '5px',
      width: '20%', 
      minWidth: '250px', 
    };
  
    const welcomeTextStyle = {
      margin: '0px', 
      fontSize: '24px', 
      fontWeight: 'bold',
      textAlign: "center",
    };
  
    return (
      <main>
        <div style={welcomeTextStyle}>Welcome to Financial Assistance</div>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={{ padding: '10px', border: '2px solid black', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </form>
      </main>
    );
};

// need a fetch in this file
  
export default LoginPage;
