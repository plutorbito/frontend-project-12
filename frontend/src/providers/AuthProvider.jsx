import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const loginData = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={loginData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
