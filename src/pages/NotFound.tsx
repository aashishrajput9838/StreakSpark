import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-appPalette-dark-background text-appPalette-dark-text">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-appPalette-dark-muted mb-4">Oops! Page not found</p>
        <a href="/" className="text-appPalette-pink hover:text-appPalette-purple underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
