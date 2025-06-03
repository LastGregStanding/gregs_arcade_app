const LeaderboardDropBtn = ({ game, handleClick }) => {
  return (
    <td>
      <button className="navbar-button" onClick={() => handleClick(game)}>
        {game}
      </button>
    </td>
  );
};

export default LeaderboardDropBtn;
