import React from "react";

const UniversalStatsRow = ({ statsObj, ranking }) => {
  return (
    <tr>
      <td>{ranking + 1}</td>
      <td>{statsObj.username}</td>
      <td>{statsObj.high_score}</td>
      <td>{new Date(statsObj.date).toLocaleDateString()}</td>
    </tr>
  );
};

export default UniversalStatsRow;
