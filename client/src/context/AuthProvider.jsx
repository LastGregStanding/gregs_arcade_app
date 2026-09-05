import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/apiUrl";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  // Refresh function to call after user logs in or logs out
  const refreshUser = () => {
    axios
      .get(`${API_URL}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        setUsername(res.data.user.username);
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
        setUsername(null);
      });
  };

  // Load the user on the first mount
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, username, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
