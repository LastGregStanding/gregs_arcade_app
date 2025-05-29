import { useLocation } from "react-router-dom";
import UniversalLeaderboard from "../components/UniversalLeaderboard";

const LeaderboardPage = () => {
  const location = useLocation();
  const game = location.state?.game;

  return (
    <div>
      <div className="leaderboard-page-container">
        <UniversalLeaderboard game={game} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
