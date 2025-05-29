import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [wrongInfo, setWrongInfo] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      // Optionally reset the form or redirect the user
    } catch (error) {
      console.error("Error during login:", error);
      setWrongInfo(true);
    }
  };

  if (loggedIn) {
    return (
      <div className="welcome-message">
        <h2>Welcome back {formData.username}!</h2>
      </div>
    );
  }

  return (
    <div className="form-table">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
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
