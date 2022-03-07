import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  let provider = new GoogleAuthProvider();
  const [currentUser, setUser] = useState({ loggedIn: false });

  function logIn(e) {
    e.preventDefault();
    return setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithPopup(auth, provider).then((result) => {
          console.log(result);
          console.log(result.user.displayName);
        });
      })
      .catch((err) => console.error(err));
  }

  function logOut() {
    signOut(auth).then(() => {
      setUser({ loggedIn: false });
      alert("User has successfully logged out.");
    });
  }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({
            id: user.uid,
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
            loggedIn: true,
          });
        }
      });
    }, [auth]);



  const values = { logIn, currentUser, logOut };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
