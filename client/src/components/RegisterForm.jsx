import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import RegisterFormInput from "./RegisterFormInput";

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
      // Register a new user
      const signupResponse = await axios.post(
        "http://localhost:5150/api/auth/register-user",
        formData
      );
      console.log("Signup successful:", signupResponse);

      try {
        // Immediately log them in after registering
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

  // After user registers account, present a welcome message
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
        <RegisterFormInput
          formData={formData}
          handleChange={handleChange}
          type={"email"}
          name={"email"}
          label={"Email"}
        />
        <RegisterFormInput
          formData={formData}
          handleChange={handleChange}
          type={"text"}
          name={"username"}
          label={"Username"}
        />
        <RegisterFormInput
          formData={formData}
          handleChange={handleChange}
          type={"password"}
          name={"password"}
          label={"Password"}
        />
        <button className="form-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
