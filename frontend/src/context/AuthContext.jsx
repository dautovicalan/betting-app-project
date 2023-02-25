import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const AuthContext = React.createContext({
  loggedUser: {},
  register: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return setLoggedUser(user);
      }
      return setLoggedUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    loggedUser: { userUid: "wSoqoAH6TiWS1jq0yKRURPpValc2" },
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
