import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const handlePlayGamesClick = () => {
    navigate("/");
  };
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      const signupResponse = await axios.post(
        "http://localhost:5150/api/auth/register-user",
        formData
      );
      console.log("Signup successful:", signupResponse);

      try {
        const loginResponse = await axios.post(
          "http://localhost:5150/api/auth/login",
          {
            username: formData.username,
            password: formData.password,
          },
          { withCredentials: true }
        );
        console.log("Login successful:", loginResponse);
        setLoggedIn(true);
      } catch (loginError) {
        console.error("Error during login:", loginError);
      }
    } catch (signupError) {
      console.error("Error during signup:", signupError);
    }
  };

  if (loggedIn) {
    return (
      <div className="welcome-message">
        <h2>Successfully Registered</h2>
        <h2>Welcome {formData.username} to Greg's Arcade!</h2>
        <button className="form-button" onClick={handlePlayGamesClick}>
          Explore Games
        </button>
      </div>
    );
  }

  return (
    <div className="form-table">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

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
        <button className="form-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
