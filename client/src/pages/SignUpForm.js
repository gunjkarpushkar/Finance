import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {

        e.preventDefault();
        // Handle sign-up form submission
        // Send user details to backend for registration

        // Check if any input field is empty
        if (!firstName || !lastName || !email || !password) {
        setErrorMessage('Please fill out all fields.');
        return;
    }

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post('/create_contact', newUser);
            console.log(response.data);
            setSuccessMessage('Account created successfully!');
            onClose();
        } catch (error) {
            console.error('Error creating account:', error);
           setErrorMessage('Account creation failed. Please try again.');
            onClose();
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

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '999', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '30%', height: '70%' }}>
                <h2>Create an Account</h2>
                <form onSubmit={handleSignUp} style={{formStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Email"
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
                    <button type="submit" style={{ padding: '10px', border: '2px solid black', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default SignUpForm;
