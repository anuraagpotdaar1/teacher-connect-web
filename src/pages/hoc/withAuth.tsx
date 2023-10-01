import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/router";

const withAuth = <P extends Record<string, unknown>>(
  Component: ComponentType<P>,
): ComponentType<P> => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null,
    );

    useEffect(() => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    }, []);

    useEffect(() => {
      if (isAuthenticated === false) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
