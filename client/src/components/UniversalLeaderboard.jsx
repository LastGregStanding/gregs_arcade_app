import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversalStatsRow from "./UniversalStatsRow";

const UniversalLeaderboard = ({ game }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fetch leaderboard stats
    axios
      .get(`http://localhost:5150/api/leaderboard/${game}`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard stats:", err);
      });
  }, [game]);
  return (
    <div>
      <h1 className="highscore-table-title">{game}</h1>
      <table className="highscore-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Ranking</th>
            <th style={{ width: "30%" }}>Username</th>
            <th style={{ width: "30%" }}>Score</th>
            <th style={{ width: "15%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <UniversalStatsRow key={index} statsObj={stat} ranking={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversalLeaderboard;
