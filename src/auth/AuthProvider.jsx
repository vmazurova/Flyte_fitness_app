import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Používáme pojmenovaný export

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Použití pojmenovaného exportu

        const currentTime = Date.now() / 1000; // Aktuální čas v sekundách
        if (decodedToken.exp > currentTime) {
          setUser({ id: decodedToken.id });
        } else {
          localStorage.removeItem("jwt");
        }
      } catch (err) {
        console.error("Chyba při dekódování tokenu:", err);
        localStorage.removeItem("jwt");
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
