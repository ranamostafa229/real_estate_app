/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";

const Slider = ({ property }) => {
  const [activeThumb, setActiveThumb] = useState();
  SwiperCore.use(Navigation);

  return (
    <div className="block ">
      {property.imageUrls && (
        <Swiper
          style={{
            "--swiper-navigation-color": "#FF385C",
            "--swiper-pagination-color": "red",
            borderRadius: "0.5rem",
          }}
          loop={property.imageUrls?.length > 1 ? true : false}
          spaceBetween={10}
          navigation={property.imageUrls?.length > 1 ? true : false}
          modules={[Navigation, Thumbs, FreeMode]}
          grabCursor={true}
          thumbs={{ swiper: activeThumb }}
          centeredSlides={true}
          centeredSlidesBounds={true}
          // slidesPerView={3}
        >
          {property.imageUrls?.map((url) => (
            <SwiperSlide key={url}>
              <div className="flex h-[400px] max-w-6xl ">
                <img src={url} alt="" className="w-full bg-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {property.imageUrls && (
        <Swiper
          onSwiper={setActiveThumb}
          loop={true}
          spaceBetween={10}
          slidesPerView={4.4}
          modules={[Navigation, Thumbs, FreeMode]}
          freeMode={true}
          watchSlidesProgress={true}
        >
          {property.imageUrls?.map(
            (url) =>
              property.imageUrls?.length > 1 && (
                <SwiperSlide key={url}>
                  {({ isActive, isVisible }) => (
                    <div
                      className={`h-[100px] w-full  cursor-pointer mt-5 rounded-md
            `}
                      style={{
                        background: `url(${url}) no-repeat center  `,
                        backgroundSize: "cover",
                        opacity: isActive && isVisible ? " 1" : "0.5",
                      }}
                    ></div>
                  )}
                </SwiperSlide>
              )
          )}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;
