import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const LoginForm = () => {
  const navigate = useNavigate();
  const handlePlayGamesClick = () => {
    navigate("/");
  };
  const { loggedIn, setLoggedIn, refreshUser } = useContext(AuthContext);
  const [wrongInfo, setWrongInfo] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle change in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5150/api/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login successful:", response);
      setLoggedIn(true);
      await refreshUser();
    } catch (error) {
      console.error("Error during login:", error);
      setWrongInfo(true);
    }
  };

  // After logging in, be greeted with a welcome back message
  if (loggedIn) {
    return (
      <div className="welcome-message">
        <h2>Welcome back {formData.username}!</h2>
        <button className="form-button" onClick={handlePlayGamesClick}>
          Explore Games
        </button>
      </div>
    );
  }

  return (
    <div className="form-table">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div className="form-input-container">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div className="form-input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* If the user inputted the wrong credentials */}
        <p className="wrong-info">
          {wrongInfo ? "Wrong username or password" : ""}
        </p>
        <button className="form-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
