import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function AccountDropdown() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const handleAccountBtnClick = () => {
    navigate(loggedIn ? "/account" : "/register");
  };

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  const handleLogoutBtnClick = () => {
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
                {/* If user logged in, display stats button. Otherwise register button */}
                <button
                  className="navbar-button"
                  onClick={handleAccountBtnClick}
                >
                  {loggedIn ? "Stats" : "Register"}
                </button>
              </td>
              <td>
                {/* Display Log In/Out button depending if user is logged in or not */}
                {loggedIn ? (
                  <button
                    onClick={handleLogoutBtnClick}
                    className="navbar-button"
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    onClick={handleLoginBtnClick}
                    className="navbar-button"
                  >
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
