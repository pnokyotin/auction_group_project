// src/components/Carousel/Carousel2.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from '../../Card/card_product';
import { Navigation } from 'swiper/modules';

export default function CardCarousel({ cards }) {
  return (
    <div className="w-full py-4 px-2 bg-white/10 backdrop-blur-md rounded-lg">
      <Swiper
        spaceBetween={4}
        slidesPerView={1.3}    // มือถือ
        grabCursor={true}
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        observer={true}        // 🔹 ตรวจจับ container size
        observeParents={true}  // 🔹 ตรวจสอบ parent container ด้วย
        onSwiper={(swiper) => swiper.update()} // 🔹 อัพเดต Swiper ทันที
        breakpoints={{
          640: { slidesPerView: 1.8, slidesPerGroup: 1 },  // tablet
          768: { slidesPerView: 2, slidesPerGroup: 2 },    // desktop
          1024: { slidesPerView: 2.2, slidesPerGroup: 2 }, // large
          1280: { slidesPerView: 2.4, slidesPerGroup: 2 }, // extra large
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

        {/* Swiper Navigation Buttons */}
        <div className="swiper-button-prev text-white/80 hover:text-white"></div>
        <div className="swiper-button-next text-white/80 hover:text-white"></div>
      </Swiper>
    </div>
  );
}
