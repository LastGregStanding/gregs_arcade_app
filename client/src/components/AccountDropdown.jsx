import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AccountDropdown() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const handleAccountClick = () => {
    navigate(loggedIn ? "/account" : "/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    axios
      .post("http://localhost:5150/api/auth/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        setLoggedIn(false);
        navigate("/logout");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="nav-dropdown-container">
      <p className="dropdown-name">Account</p>
      <div className="nav-dropdown">
        <table className="dropdown-table">
          <tbody>
            <tr>
              <td>
                <button className="navbar-button" onClick={handleAccountClick}>
                  {loggedIn ? "Stats" : "Register"}
                </button>
              </td>
              <td>
                {loggedIn ? (
                  <button onClick={handleLogoutClick} className="navbar-button">
                    Log Out
                  </button>
                ) : (
                  <button onClick={handleLoginClick} className="navbar-button">
                    Log In
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountDropdown;
