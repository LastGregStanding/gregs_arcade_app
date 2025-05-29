import React, { useEffect, useState } from "react";
import axios from "axios";
import UserStatsRow from "./UserStatsRow";

const UserStatsTable = () => {
  // const [stats, setStats] = useState(null);
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fetch user info (username from JWT)
    axios
      .get("http://localhost:5150/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.user.username);
      })
      .catch((err) => {
        console.error("Failed to fetch username:", err);
      });

    // Fetch user stats
    axios
      .get("http://localhost:5150/api/user/stats", { withCredentials: true })
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user stats:", err);
      });
  }, []);

  return (
    <div>
      <div className="user-stats-container">
        <h1>{username ? `${username}'s Stats` : "Loading..."}</h1>

        {/* Example static data — replace with real stats when ready */}
        <div className="user-stats">
          <div className="user-stats-info-style">
            <h2>Account Created Date:</h2>
            {/* <h2>{stats}</h2> */}
          </div>
          <div className="user-stats-info-style">
            <h2>Favorite Game:</h2>
            <h2>Pacman</h2>
          </div>
        </div>

        <table className="user-stats-game-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Game</th>
              <th style={{ width: "30%" }}>Times Played</th>
              <th style={{ width: "30%" }}>Highscore</th>
              <th style={{ width: "15%" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <UserStatsRow
                key={index}
                gameName={stat.game_name}
                highScore={stat.high_score}
                playCount={stat.play_count}
                date={stat.high_score_date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStatsTable;
