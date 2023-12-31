import React, { useEffect, useState } from 'react';
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
import Settings from './pages/Settings';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Newmessage from './components/Newmessage';

function App() {
  const [isAuthen, setIsAuthen] = useState(false);

  // Fonction pour mettre à jour l'état d'authentification après la connexion réussie
  const handleLogin = () => {
    // Après l'authentification réussie, mettre setIsAuthen à true
    setIsAuthen(true);
    // Peut-être rediriger l'utilisateur vers une page spécifique ici
  };

  const handleLogout = () => {
    setIsAuthen(false);
  };

  useEffect(() => {
    if (isAuthen) {
      document.body.style.backgroundColor = '#fff';
    }
  }, [isAuthen]);

  return (
    <Router>
      {!isAuthen ? (
        <div>
          <Routes>
            <Route path="/index.html" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={<Signup handleLogin={handleLogin} />}
            />
            <Route
              path="/signin"
              element={<Signin handleLogin={handleLogin} />}
            />
          </Routes>
        </div>
      ) : (
        <React.StrictMode>
          <Header handleLogout={handleLogout} />
          <SideBar />
          <Routes>
            <Route path="/mails/:category" element={<Mails />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/files/:category" element={<Files />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/newmessage" element={<Newmessage />} />
          </Routes>
        </React.StrictMode>
      )}
    </Router>
  );
}

export default App;
