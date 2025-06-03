import UserStatsRow from "./UserStatsRow";

const UserStatsTable = ({ stats }) => {
  return (
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
  );
};

export default UserStatsTable;
