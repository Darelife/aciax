"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";
import LoadingIndicator from "../src/app/components/LoadingIndicator";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const thing = process.env.NEXT_PUBLIC_COOKIE_SECRET;

    useEffect(() => {
      const tokenn = Cookies.get("auth");
      if (tokenn) {
        try {
          const token = CryptoJS.AES.decrypt(tokenn, thing).toString(
            CryptoJS.enc.Utf8
          );
          const decoded = jwt.verify(token, thing);
          if (decoded.email.endsWith("@goa.bits-pilani.ac.in")) {
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Error verifying token:", e);
        }
      }
      if (!user) {
        const redirectTo = window.location.pathname;
        router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
      } else {
        setLoading(false);
      }
    }, [user, router, thing]);

    if (loading) {
      return <LoadingIndicator />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
