"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "../../../context/AuthContext";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import CryptoJs from "crypto-js";

const Login = () => {
  const { login, logout, user, error } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notValid, setNotValid] = useState(false);
  const [email, setEmail] = useState("");
  const thing: string = process.env.NEXT_PUBLIC_COOKIE_SECRET as string;

  useEffect(() => {
    if (user) {
      console.log("Email:", user?.email || "No email yet");
      setEmail(user.email);
      if (user.email && !user.email.endsWith("@goa.bits-pilani.ac.in")) {
        setNotValid(true);
      } else if (user.email) {
        const redirectTo = searchParams.get("redirectTo") || "/";
        router.push(redirectTo);
        const token: string = jwt.sign({ email: user.email }, thing);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {notValid ? (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "red" }}>Invalid Email</h1>
          <p>Please log in with your BITS Pilani Goa email.</p>
          <button
            onClick={login}
            style={{
              marginTop: "10px",
              padding: "15px 30px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#3cb371",
              color: "#f8f9fa",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Retry Login with Google
          </button>
          <p style={{ marginTop: "10px" }}>{email}</p>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={login}
            style={{
              padding: "15px 30px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#3cb371",
              color: "#f8f9fa",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Login with Google
          </button>
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
