import "../index.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import gameData from "../game-data.json";
import GameSlide from "../components/GameSlide";

const HomePage = () => {
  return (
    <Swiper
      effect="coverflow"
      modules={[EffectCoverflow]}
      spaceBetween={50}
      slidesPerView={3}
      loop={true}
    >
      {/* Lay out all the different games */}
      {gameData.map((game, key) => (
        <SwiperSlide>
          <GameSlide key={key} game={game} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomePage;
