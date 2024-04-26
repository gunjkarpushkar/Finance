import React, { useState } from 'react';
import axios from 'axios';
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
    /**
     * State to store the first name input by the user.
     * @type {string}
     */
    const [firstName, setFirstName] = useState('');
    /**
     * State to store the last name input by the user.
     * @type {string}
     */
    const [lastName, setLastName] = useState('');
    /**
     * State to store the email input by the user.
     * @type {string}
     */
    const [email, setEmail] = useState('');
    /**
     * State to store the password input by the user.
     * @type {string}
     */
    const [password, setPassword] = useState('');
    /**
     * State to store the success message after successful registration.
     * @type {string}
     */
    const [successMessage, setSuccessMessage] = useState('');
    /**
     * State to store error messages related to form validation or registration failure.
     * @type {string}
     */
    const [errorMessage, setErrorMessage] = useState('');
    /**
     * Handles the form submission for signing up a new user. Validates input fields,
     * constructs a user object, and attempts to register the user via a POST request.
     * Displays success or error messages based on the outcome.
     *
     * @param {React.FormEvent} e - The form submission event.
     */
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
            setSuccessMessage('Account created');
            onClose();
        } catch (error) {
            console.error('Error creating account:', error);
            setErrorMessage('Account creation failed. Please try again.');
            //onClose();
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
            <div style={{ position: "relative", backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '30%', height: '70%' }}>
                <div style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer", fontSize: "24px" }} onClick={onClose}>X</div>
                <h2>Create an Account</h2>
                <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', border: '2px solid black', borderRadius: '5px', width: '20%', minWidth: '250px' }}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', border: '2px solid black', borderRadius: '5px', width: '20%', minWidth: '250px' }}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', border: '2px solid black', borderRadius: '5px', width: '20%', minWidth: '250px' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', border: '2px solid black', borderRadius: '5px', width: '20%', minWidth: '250px' }}
                    />
                    <button type="submit" style={{ padding: '10px', border: '2px solid black', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default SignUpForm;
