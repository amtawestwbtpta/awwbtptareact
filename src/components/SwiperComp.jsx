import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../context/FirbaseContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cube";
import { EffectCube } from "swiper";
const SwiperComp = () => {
  const [data, setData] = useState(false);
  const fileRef = ref(storage, "slides/");
  const [downloadFileUrl, setDownloadFileUrl] = useState([]);
  const getData = () => {
    listAll(fileRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setDownloadFileUrl((prev) => [...prev, url]);
        });
      });
    });
    setData(true);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid">
      {data ? (
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCube,
            Autoplay,
          ]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          effect={"cube"}
          cubeEffect={{
            slideShadows: true,
            shadowOffset: 5,
            shadowScale: 0.94,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {downloadFileUrl.map((url, ind) => {
            return (
              <SwiperSlide key={ind}>
                <img
                  src={url}
                  style={{ width: "100%", height: "50%" }}
                  alt="slideImages"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
};

export default SwiperComp;
