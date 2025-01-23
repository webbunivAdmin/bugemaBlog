import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import back1 from "../assets/cc.jpeg";
import back2 from "../assets/buadmin.jpg";
import back3 from "../assets/nurses1.jpg";

export default function Hero() {
  const slides = [
    {
      image: back1,
      title: "Student Blogs",
      text: "Read articles written by Bugema students from around the world, sharing their study experiences with fellow students.",
    },
    {
      image: back2,
      title: "Campus Life",
      text: "Explore the vibrant campus life and discover the events and activities happening around you.",
    },
    {
      image: back3,
      title: "Learning Beyond Borders",
      text: "Hear stories from students who have crossed borders to achieve their academic dreams.",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="relative h-[500px] bg-[#1C1535] text-white mt-3 lg:mt-[80px] lg:mb-[30px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {/* Motion Wrapper for Animated Text */}
              <motion.h1
                className="text-5xl font-serif mb-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 1 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="max-w-2xl text-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {slide.text}
              </motion.p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
