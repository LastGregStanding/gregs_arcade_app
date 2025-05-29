import { useNavigate } from "react-router-dom";

function LeaderboardDropdown() {
  const navigate = useNavigate();

  const handleClick = (game) => {
    navigate("/leaderboards", { state: { game } });
  };

  return (
    <div className="nav-dropdown-container">
      <p className="dropdown-name">Leaderboards</p>
      <div className="nav-dropdown">
        <table className="dropdown-table">
          <tbody>
            <tr>
              <td>
                <button
                  className="navbar-button"
                  onClick={() => handleClick("Pacman")}
                >
                  Pacman
                </button>
              </td>
              <td>
                <button
                  className="navbar-button"
                  onClick={() => handleClick("Tetris")}
                >
                  Tetris
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="navbar-button"
                  onClick={() => handleClick("Snake")}
                >
                  Snake
                </button>
              </td>
              <td>
                <button
                  className="navbar-button"
                  onClick={() => handleClick("Set")}
                >
                  Set
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardDropdown;
