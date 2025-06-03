import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import ScoreModal from "../components/ScoreModal";

const GamePage = () => {
  const { gameName } = useParams();
  const [stats, setStats] = useState({});
  const [score, setScore] = useState(null);
  const { username } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [newHighScore, setNewHighScore] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch user highscore for the specific game
  useEffect(() => {
    axios
      .get(`http://localhost:5150/api/user/game-stats?gameName=${gameName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setStats(res.data[0]);
      })
      .catch((err) => {
        console.error("Failed to fetch user stats:", err);
      });
  }, [gameName, refreshKey]);

  // Handle the data from the game when it is over
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "GAME_OVER") {
        setScore(event.data.score);

        // Check for new high score
        if (stats.high_score === null || event.data.score > stats.high_score) {
          setNewHighScore(true);
        } else {
          setNewHighScore(false);
        }
        // Show modal
        setShowModal(true);

        // Game over, send data to database
        axios
          .post(
            `http://localhost:5150/api/user/new-highscore?gameName=${gameName}`,
            {
              gameName,
              playCount: stats.play_count,
              score: event.data.score,
            },
            { withCredentials: true }
          )
          .then(() => {
            console.log("Score submitted successfully");
          })
          .catch((err) => {
            console.error("Failed to submit score:", err);
          });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [gameName, stats, score]);

  // Prevent scrolling when the modal is up
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    // Clean up in case the component is unmounted while modal is open
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [showModal]);

  return (
    <div>
      {stats.high_score >= 0 && stats.high_score !== null && (
        <h3 className="game-highscore">
          {username}'s Current High Score: {stats.high_score}
        </h3>
      )}

      {/* Integrate the game into React */}
      <iframe
        key={refreshKey}
        src={`/games/${gameName}/index.html?origin=${window.location.origin}`}
        title={gameName}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      />

      {/* Show modal if game is over */}
      {showModal && (
        <ScoreModal
          setRefreshKey={setRefreshKey}
          refreshKey={refreshKey}
          setShowModal={setShowModal}
          score={score}
          newHighScore={newHighScore}
        />
      )}
    </div>
  );
};

export default GamePage;
