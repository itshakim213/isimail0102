import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
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
import { ChatContext } from './context/ChatContext';

const queryClient = new QueryClient();

function App() {
  const [isAuthen, setIsAuthen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...'); // Ajout d'un message de test
    setIsAuthen(false);
  };

  // Fonction pour mettre à jour l'état d'authentification après la connexion réussie
  const handleLogin = () => {
    // Après l'authentification réussie, mettre setIsAuthen à true
    setIsAuthen(true);
    // Peut-être rediriger l'utilisateur vers une page spécifique ici
  };
  useEffect(() => {
    if (isAuthen) {
      document.body.style.backgroundColor = '#fff';
    }
  }, [isAuthen]);

  return (
    <QueryClientProvider client={queryClient}>
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
            <ChatContext>
              <Header handleLogout={handleLogout} />
              <SideBar />
              <Routes>
                <Route path="/mails/:category" element={<Mails />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/files/:category" element={<Files />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route
                  path="/settings"
                  element={<Settings handleLogout={handleLogout} />}
                />
                <Route path="/newmessage" element={<Newmessage />} />
                {/* <Route path="/visio" element={<Visio />} /> */}
              </Routes>
            </ChatContext>
          </React.StrictMode>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;
