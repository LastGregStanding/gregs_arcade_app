import { useNavigate } from "react-router-dom";
import LeaderboardDropBtn from "./LeaderboardDropBtn";

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
              <LeaderboardDropBtn handleClick={handleClick} game={"Pacman"} />
              <LeaderboardDropBtn handleClick={handleClick} game={"Tetris"} />
            </tr>
            <tr>
              <LeaderboardDropBtn handleClick={handleClick} game={"Snake"} />
              <LeaderboardDropBtn handleClick={handleClick} game={"Set"} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardDropdown;
