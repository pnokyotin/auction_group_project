// components/CardCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../Card';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


export default function CardCarousel({ cards }) {
  return (
    <div className="w-full py-2 px-0">
      <Swiper
        spaceBetween={8}
        slidesPerView={1}      // มือถือ
        slidesPerGroup={1}
        grabCursor={true}
        modules={[Navigation]}
        navigation
        breakpoints={{
          640: { slidesPerView: 2, slidesPerGroup: 2 },  // tablet
          768: { slidesPerView: 3, slidesPerGroup: 3 },  // desktop
          1024: { slidesPerView: 4, slidesPerGroup: 4 }, // large
          1280: { slidesPerView: 5, slidesPerGroup: 5 }, // extra large
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="w-auto">
            <Card
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}