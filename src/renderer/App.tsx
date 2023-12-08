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
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
  const [isAuthen, setIsAuthen] = useState(false);

  // Fonction pour mettre à jour l'état d'authentification après la connexion réussie
  const handleLogin = () => {
    // Après l'authentification réussie, mettre setIsAuthen à true
    setIsAuthen(true);
    // Peut-être rediriger l'utilisateur vers une page spécifique ici
  };
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
            <Route
              path="/signin"
              element={<Signin handleLogin={handleLogin} />}
            />
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
