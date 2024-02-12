import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    document.cookie = `jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.setItem("username", JSON.stringify(""));
    window.location.reload(true);
    navigate("/");
  }, []);

  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
