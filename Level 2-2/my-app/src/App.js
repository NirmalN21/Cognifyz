import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Register from './components/Register';
import Home from './components/Home';
import Dummy from './components/Dummy';
import Logout from './components/Logout';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Dummy />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
