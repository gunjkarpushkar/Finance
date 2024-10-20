import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';  // Import the CSS file

/**
 * SignUpForm provides a user interface for creating a new user account.
 * It collects user information such as first name, last name, email, and password,
 * and sends these details to the backend for registration. It also manages
 * form validation and displays success or error messages.
 *
 * @component
 * @param {Function} onClose - Function to close the modal form.
 * @returns {React.Component} The SignUpForm component with form elements and logic.
 */
const SignUpForm = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        const newUser = { firstName, lastName, email, password };

        try {
            const response = await axios.post('/create_contact', newUser);
            console.log(response.data);
            setSuccessMessage('Account created');
            onClose();
        } catch (error) {
            console.error('Error creating account:', error);
            setErrorMessage('Account creation failed. Please try again.');
        }
    };

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="signup-overlay">
                <div className="signup-container">
                    <div className="signup-close" onClick={onClose}>X</div>
                    <h2>Create an Account</h2>
                    
                    <form onSubmit={handleSignUp}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="signup-input"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="signup-input"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="signup-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="signup-input"
                        />
                        <button type="submit" className="signup-butto">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
