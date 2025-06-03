import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import UserStatsTable from "../components/UserStatsTable";

const AccountPage = () => {
  const [stats, setStats] = useState([]);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    // Fetch user stats
    axios
      .get("http://localhost:5150/api/user/table-stats", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("The stats: ", res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user stats:", err);
      });
  }, []);

  // Calculate which game the user played the most
  const mostPlayedGame = stats.length
    ? stats.reduce((max, game) =>
        game.play_count > max.play_count ? game : max
      )
    : null;

  // Assign most played game as favorite game
  const favoriteGameName =
    mostPlayedGame && mostPlayedGame.play_count > 0
      ? mostPlayedGame.game_name
      : "N/A";

  return (
    <div>
      <div className="user-stats-container">
        <h1>{username ? `${username}'s Stats` : "Loading..."}</h1>
        <div className="user-stats">
          <div className="user-stats-info-style">
            <h2>
              Account Created Date:{" "}
              {stats.length > 0
                ? new Date(stats[0].account_created_at).toLocaleDateString()
                : null}
            </h2>
          </div>
          <div className="user-stats-info-style">
            <h2>Favorite Game: {favoriteGameName}</h2>
          </div>
        </div>
        <UserStatsTable stats={stats} />
      </div>
    </div>
  );
};

export default AccountPage;
