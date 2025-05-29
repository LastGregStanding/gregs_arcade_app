import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5150/api/auth/me", { withCredentials: true })
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
      {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
