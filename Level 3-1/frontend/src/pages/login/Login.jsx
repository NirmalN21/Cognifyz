import React, { useState } from 'react';
import axios from 'axios';
import "../login/login.css"
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constants';

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

    // Add your login logic here
    console.log('Login Data:', formData);

    const config = { withCredentials: true }

    localStorage.setItem("username", JSON.stringify(formData.username));

    axios.post(`${SERVER_URL}/user/login`, formData, config)
      .then(() => {
        alert("User logged in successfully");
        navigate("/timeline");
        window.location.reload(true);
      })
      .catch((err) => {
        console.log("Error", err);
      })

    // Reset the form after handling the data (you might want to redirect the user)
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <br />

        <label>Password:</label>
        <input
          type="password" name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
