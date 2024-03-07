import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loginStatus')) ?? false);
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('userId'))?.username ?? null);

  const logIn = (user) => {
    setLoggedIn(true);
    setUsername(user);
    localStorage.setItem('loginStatus', true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('loginStatus');
    setUsername(null);
    setLoggedIn(false);
  };

  const loginData = useMemo(
    () => ({
      loggedIn, logIn, logOut, username,
    }),
    [loggedIn, username],
  );

  return (
    <AuthContext.Provider value={loginData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
