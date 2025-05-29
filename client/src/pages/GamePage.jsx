import { useEffect } from "react";
import { useParams } from "react-router-dom";

const GamePage = () => {
  useEffect(() => {
    function handleMessage(event) {
      // Optional: check origin if you're deploying
      if (event.data?.type === "GAME_OVER") {
        const { score } = event.data;
        console.log(score);

        // Now send score to your backend
        //   fetch("/api/highscores", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     credentials: "include", // if using cookies for auth
        //     body: JSON.stringify({ game, score }),
        //   })
        //     .then((res) => res.json())
        //     .then((data) => console.log("Score submitted:", data))
        //     .catch((err) => console.error("Error submitting score:", err));
        // }
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const { gameName } = useParams();

  return (
    <div>
      <iframe
        src={`/games/${gameName}/index.html`}
        title={gameName}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      />
    </div>
  );
};

export default GamePage;
