import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import notFoundPageData from "@/data/pages/NotFound.json";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{notFoundPageData.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{notFoundPageData.message}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {notFoundPageData.returnLinkText}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
