import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import NavbarElement from './components/Navbar';
import { ROUTERS } from './utils/router';
import AuthContext from './contexts';
import useAuth from './hooks';
import SignupPage from './components/SignupPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <NavbarElement />
          <Routes>
            <Route path={ROUTERS.loginPage} element={<LoginPage />} />
            <Route path={ROUTERS.other} element={<NotFoundPage />} />
            <Route
              path={ROUTERS.chatPage}
              element={
                <ChatRoute>
                  <ChatPage />
                </ChatRoute>
              }
            />
            <Route path={ROUTERS.signupPage} element={<SignupPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
