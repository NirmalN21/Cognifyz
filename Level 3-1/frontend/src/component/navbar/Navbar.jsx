import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../navbar/navbar.css"
import { SERVER_URL } from '../../constants';

const Navbar = () => {

  const [cookieValue, setCookieValue] = useState("");
  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      if (cookieValue) {
        const response = await axios.get(`${SERVER_URL}/user/getData/${cookieValue}`)
        setUser(response.data.aliasName);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    setCookieValue(cookieValue);

    if (cookieValue) {
      fetchUser();
    }

  }, [cookieValue])

  return (
    <nav className='navbar-container'>

      {user ? <span><b>Logged in as {user}</b></span> : <NavLink to="/">Login</NavLink>}


      {!user && <NavLink to="/register">Register</NavLink>}


      {user && <NavLink to="/timeline">Timeline</NavLink>}


      {user && <NavLink to="/create-poll">Create Poll</NavLink>}

      {user && <NavLink to="/myPolls">My Polls</NavLink>}

      {user && <NavLink to="/logout">LogOut</NavLink>}

    </nav>
  );
};

export default Navbar;
