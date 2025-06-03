import { useNavigate } from "react-router-dom";

const ScoreModal = ({ score, newHighScore, setRefreshKey, setShowModal }) => {
  const navigate = useNavigate();

  // User wants to go to homepage
  const handlePlayGamesClick = () => {
    navigate("/");
  };

  // User wants to play the game again
  const handleNewGame = () => {
    setShowModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Game Over</h2>
          <h3>Your score: {score}</h3>
          <h3>{newHighScore ? "New highscore!!!" : "No new highscore :("}</h3>
          <button onClick={handleNewGame} className="modal-button">
            Play Again
          </button>
          <br />
          <button className="modal-button" onClick={handlePlayGamesClick}>
            Game Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;
