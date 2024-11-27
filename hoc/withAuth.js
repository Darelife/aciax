"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!user) {
        const redirectTo = window.location.pathname;
        router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
      } else {
        setLoading(false);
      }
    }, [user, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
