import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { API_URL } from "../config/apiUrl";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { AuthContext } from "../context/AuthProvider";

const MainLayout = () => {
  const { setLoggedIn } = useContext(AuthContext);

  // Check if user is currently authenticated when the component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        console.log("Auth check success:", res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error("Error during auth check:", err);
        setLoggedIn(false);
      });
  }, [setLoggedIn]);

  return (
    <div className="primary-site-container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
