import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Chats from './pages/Chats';
import Mails from './pages/Mails';
import Files from './pages/Files';
import Agenda from './pages/Agenda';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/index.html" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/mails" element={<Mails />} />
          <Route path="/files" element={<Files />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
