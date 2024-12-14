// contexts/AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    JSON.parse(localStorage.getItem("isSignedIn")) || false
  );

  const signIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", JSON.stringify(true));
  };

  const signOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("isSignedIn");
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
