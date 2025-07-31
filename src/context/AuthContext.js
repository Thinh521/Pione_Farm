import React, {createContext, useEffect, useState} from 'react';
import {getToken, removeToken} from '~/utils/storage/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const token = await getToken();
      console.log('Token:', token);
      setIsLoggedIn(!!token);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    await removeToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, setIsLoggedIn, checkLogin, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
