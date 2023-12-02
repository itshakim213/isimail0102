import React, { useEffect } from 'react';
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
import Files from './pages/Files';
import Agenda from './pages/Agenda';
import Mails from './pages/Mails';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
  let isAuthen = false;

  useEffect(() => {
    if (!isAuthen) {
      import('./styles/Visiter.css');
    } else {
      import('./styles/User.css');
    }
  }, [isAuthen]);

  return (
    <Router>
      {!isAuthen ? (
        <div>
          <Routes>
            <Route path="/index.html" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
      ) : (
        <React.StrictMode>
          <Header />
          <SideBar />
          <Routes>
            <Route path="/mails/:category" element={<Mails />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/files/:category" element={<Files />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </React.StrictMode>
      )}
    </Router>
  );
}

export default App;
