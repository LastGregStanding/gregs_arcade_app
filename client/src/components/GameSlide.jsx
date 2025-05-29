import { Link } from "react-router-dom";

const GameSlide = ({ game: { gameImg, name, gamePath } }) => {
  return (
    <>
      <div>
        <div className="game-slide-img">
          <Link to={`/games/${gamePath}`}>
            {" "}
            <img src={gameImg} alt={name} />
          </Link>
        </div>
        <p className="game-slide-title">{name}</p>
      </div>
    </>
  );
};

export default GameSlide;
