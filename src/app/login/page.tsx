// "use client";

// import { useContext, useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AuthContext from '../../../context/AuthContext';

// const Login = () => {
//   const { login, user, error } = useContext(AuthContext);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // let notValid :boolean = false;

//   const [notValid, setNotValid] = useState(false);
//   useEffect(() => {
//     if (user) {
//       if (!user.email.endsWith(".goa.bits-pilani.ac.in")) {
//         // const { logout } = useContext(AuthContext);
//         // logout();
//         setNotValid(true);
//       } else {
//         const redirectTo = searchParams.get('redirectTo') || '/';
//         router.push(redirectTo);
//       }
//     }
    
//     // console.log(user);
//   }, [user, router, searchParams]);
//   // const { logout } = useContext(AuthContext);
//   // if (!notValid) {
//   //   return (
//   //     <div>
//   //       {/* <h1>Login</h1> */}
//   //       {error && <p style={{ color: 'red' }}>{error}</p>}
//   //       <button onClick={login}>Login with Google</button>
//   //     </div>
//   //   );
//   // } else {
//   //   logout();
//   //   console.log(user.email);
//   //   return (
//   //     <div>
//   //       <h1>Invalid Email</h1>
//   //       <p>Please login with your BITS email</p>
//   //       <button onClick={login}>Login with Google</button>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div>
//       {/* <h1>Login</h1> */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <button onClick={login}>Login with Google</button>
//     </div>
//   );

// };

// export default Login;

"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const { login, logout, user, error } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notValid, setNotValid] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      console.log("Email:", user?.email || "No email yet");
      setEmail(user.email);
      if (user.email && !user.email.includes("@goa.bits-pilani.ac.in")) {
        setNotValid(true);
        logout();
      } else if (user.email) {
        const redirectTo = searchParams.get("redirectTo") || "/";
        router.push(redirectTo);
      }
    }
  }, [user, router, searchParams, logout]);

  // if (email.includes("@goa.bits-pilani.ac.in")) {
  //   // useEffect
  //   const redirectTo = searchParams.get("redirectTo") || "/";
  //   router.push(redirectTo);
  //   return <div>Redirecting...</div>;
  // } else {
    // logout();
    return (
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {notValid ? (
          <div>
            <h1>Invalid Email</h1>
            <p>Please log in with your BITS Pilani Goa email.</p>
            <button style={{color:"green"}}onClick={login}>Retry Login with Google</button>
            <br />
            {email}
          </div>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </div>
    );
  // }
};

export default Login;
