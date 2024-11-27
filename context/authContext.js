// "use client";

// import { createContext, useState, useEffect } from "react";
// import { auth, signInWithPopup, provider, signOut } from "../lib/firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//         setError(null);
//       } else {
//         setUser(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const login = () =>
//     signInWithPopup(auth, provider).catch((error) => {
//       setError(error.message);
//     });

//   const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

"use client";

import { createContext, useState, useEffect } from "react";
import { auth, signInWithPopup, provider, signOut } from "../lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          await authUser.reload(); // Ensure the user's email is fully loaded
          setUser(authUser);
        } catch (e) {
          console.error("Error reloading user:", e);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = () =>
    signInWithPopup(auth, provider).catch((error) => {
      setError(error.message);
    });

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
