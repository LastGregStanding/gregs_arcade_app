import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import gameData from "../game-data.json";
import GameSlide from "./GameSlide";

const GameCollection = () => {
  return (
    <Swiper
      effect="coverflow"
      modules={[EffectCoverflow]}
      spaceBetween={50}
      slidesPerView={3}
      loop={true}
    >
      {gameData.map((game, key) => (
        <SwiperSlide>
          <GameSlide key={key} game={game} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GameCollection;
