// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Login from './pages/login/Login'; // Create separate components for Login, Register, Timeline, and CreatePoll
import Register from './pages/register/Register';
import Timeline from './pages/timeline/Timeline';
import CreatePoll from './pages/createPoll/CreatePoll';
import MyPolls from './pages/myPolls/MyPolls';
import SinglePoll from './pages/singlePoll/SinglePoll';
import Logout from './pages/logout/Logout.jsx';
import ErrorPage from './pages/Error Page/ErrorPage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timeline/:pollId" element={<SinglePoll />} />
        <Route path="/myPolls" element={<MyPolls />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
