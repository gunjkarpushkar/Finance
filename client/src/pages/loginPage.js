
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SignUpForm from './SignUpForm';
import "./loginpage.css";
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Italianno&display=swap" rel="stylesheet"></link>


/**
 * LoginPage component provides the user interface for logging into the application.
 * It allows users to enter their email and password to authenticate themselves.
 * Additionally, it provides a link to a SignUpForm for new users to create an account.
 *
 * @component
 * @param {Function} onLogin - Callback function to set the login state in the parent component.
 * @returns {React.Component} A form for user login along with an option to open the sign-up form.
 */

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false); 


    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    /**
     * Handles the submission of the login form. It posts the user credentials to the server
     * and handles the response by setting the login state or showing an error.
     *
     * @param {React.FormEvent} e - The event object for the form submission.
     */
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('/loginpage', {
          email: email, // Send email
          password: password // Send password
      });

      if (response.status === 200) {
        onLogin(true);
        navigate("/home");
        console.log("Login successful");
        setLoginError(false); 
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      alert("Login failed");
      setLoginError(true);
    }
  };
    
    //   const isAuthenticated = true; // need to verify from the databse
    //   if(isAuthenticated) {
    //     onLogin(true); // Inform App component about successful login



    //     // updateContact function is responsible for sending the user's email and password to the backend for authentication. 
    //     // It's used when a user submits their login credentials. (user authentication)
    //     // const updateContact = {
    //     //   email: email,
    //     //   password: password
    //     // }
    //     // const response = await axios.post('/contacts', { contact: updateContact });
    //     // console.log(response)
    //    # navigate("/home"); // Navigate to home after successful login

    //     //localStorage.setItem('userInfo', credentialsJson);

    //   } else {
    //     alert('Login Failed');
    //   }
    // };
    /**
     * Opens the sign-up modal by setting showSignUp to true.
     */
    const signUpButton = () => {
      setShowSignUp(true);
    };
    /**
     * Closes the sign-up modal by setting showSignUp to false.
     */
    const handleSignUpClose = () => {
      setShowSignUp(false);
    };


    // Inline styles
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '44vh', 
      
    };
  
    const inputStyle = {
      marginBottom: '10px', 
      padding: '10px', 
      border: '2px solid black', 
      borderRadius: '5px',
      width: '20%', 
      minWidth: '250px', 
      fontWeight: 'bolder',
    };
  
    const welcomeTextStyle = {
      margin: '0px', 
      fontSize: '32px', 
      fontWeight: 'bold',
      textAlign: "center",
    };

    const errorTextStyle = {
      color: 'red',
      textAlign: 'center',
      marginBottom: '10px'
    };
  
    return (
      <main>
        <div style={{...welcomeTextStyle,fontFamily: 'Italiana, serifRoboto, sans-serif' }}>Welcome to the AI Financial Assistant</div>
        <img src="./logo.png" alt="Logo" style={{ width: '200px', margin: '20px auto', display: 'block' }}/>
        <form onSubmit={handleSubmit} style={{...formStyle, fontFamily:'Italiana, serif'}}>
          {loginError && <div style={errorTextStyle}>Invalid email or password. Please try again.</div>}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{...inputStyle,fontFamily: 'Italiana, serifRoboto, sans-serif' }}
          />
          <input
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{...inputStyle,fontFamily: 'Italiana, serifRoboto, sans-serif' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px',fontFamily: 'Italiana, serifRoboto, sans-serif' }}>
                    <button type="submit"  className='login-button' style={{ padding: '10px', 
                                                  border: '2px solid black', 
                                                  borderRadius: '5px', 
                                                  
                                                  cursor: 'pointer', 
                                                  marginRight: '10px' }}>Login</button>
                    <button type="button" className='signup-button ' onClick={signUpButton} style={{ padding: '10px', 
                                                                                  border: '2px solid black', 
                                                                                  borderRadius: '5px', 
                                                                                  cursor: 'pointer' }}>Sign Up</button>
                </div>
        </form>
        {showSignUp && <SignUpForm onClose={handleSignUpClose} />}
      </main>
    );

};

// need a fetch in this file

export default LoginPage;
