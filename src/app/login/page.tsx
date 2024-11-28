"use client";

import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthContext from '../../../context/AuthContext';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import CryptoJs from 'crypto-js';

const Login = () => {
  const { login, logout, user, error } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notValid, setNotValid] = useState(false);
  const [email, setEmail] = useState("");
  // const thing = "bitCadAciaxFTW";
  const thing:string = process.env.NEXT_PUBLIC_COOKIE_SECRET as string;

  useEffect(() => {
    // const token = Cookies.get("token");
    if (user) {
      console.log("Email:", user?.email || "No email yet");
      setEmail(user.email);
      if (user.email && !user.email.endsWith("@goa.bits-pilani.ac.in")) {
        setNotValid(true);
      } else if (user.email) {
        const redirectTo = searchParams.get("redirectTo") || "/";
        router.push(redirectTo);
        const token:string = jwt.sign({ email: user.email }, thing);
        const encryptedToken = CryptoJs.AES.encrypt(token, thing).toString();
        Cookies.set("auth", encryptedToken, { expires: 1 });
      }
    }
  }, [user, router, searchParams, thing]);

  useEffect(() => {
    if (notValid) {
      logout();
    }
  }, [notValid, logout]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notValid ? (
        <div>
          <h1>Invalid Email</h1>
          <p>Please log in with your BITS Pilani Goa email.</p>
          <button onClick={login}>Retry Login with Google</button>
          <br />
          {email}
        </div>
      ) : (
        <div>
          {/* <h1>Login</h1> */}
          <button onClick={login}>Login with Google</button>
        </div>
      )}
    </div>
  );
};

export default Login;