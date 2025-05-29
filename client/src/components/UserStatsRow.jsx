import React from "react";

const UserStatsRow = ({ gameName, highScore, playCount, date }) => {
  return (
    <tr>
      <td>{gameName}</td>
      <td>{playCount}</td>
      <td>{highScore === null ? "N/A" : highScore}</td>
      <td>{date ? new Date(date).toLocaleDateString() : "N/A"}</td>
    </tr>
  );
};

export default UserStatsRow;
