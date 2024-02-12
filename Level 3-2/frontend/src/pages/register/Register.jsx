import React, { useState } from 'react'
import axios from "axios"
import "../register/register.css"
import {useNavigate} from "react-router-dom"
import { SERVER_URL } from '../../constants'

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        aliasName: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add validation logic here
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        // You can send the registration data to your server or handle it as needed
        console.log('Registration Data:', formData);

        localStorage.setItem("username", JSON.stringify(formData.username));
        
        axios.post(`${SERVER_URL}/user/register`, formData)
            .then(() => {
                console.log("User registered successfully");
                alert("User registered successfully");
                navigate("/login");
            })
            .catch((err) => {
                console.log("Error", err);
            });
    };

    return (
        <>
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <label>Alias Name:</label>
                    <input
                        type="text"
                        name="aliasName"
                        value={formData.aliasName}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register
