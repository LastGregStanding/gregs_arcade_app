import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UniversalStatsRow = ({ statsObj, ranking }) => {
  const { username } = useContext(AuthContext);
  return (
    // If logged in user is on the leaderboard, highlight their name
    <tr
      className={statsObj.username === username ? "user-leaderboard-score" : ""}
    >
      <td>{ranking + 1}</td>
      <td>{statsObj.username}</td>
      <td>{statsObj.high_score}</td>
      <td>{new Date(statsObj.high_score_date).toLocaleDateString()}</td>
    </tr>
  );
};

export default UniversalStatsRow;
