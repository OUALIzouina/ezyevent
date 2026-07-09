

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import srvc1 from "../assets/srvc1.jpg";
import srvc2 from "../assets/srvc2.jpg";
import srvc3 from "../assets/srvc3.jpg";
import srvc4 from "../assets/srvc4.jpg";
import srvc5 from "../assets/srvc5.jpg";
import srvc6 from '../assets/srvc6.jpg'


const dataservices = [
  {
    title: "Event Technologies services",
    description:
      "Proficient in advanced solutions for registration, QR codes, and streaming to optimize events.",
    image: srvc1,
  },
  {
    title: "Entertainment & Activities",
    description:
      "Creative specialists, offering DJ sets, live shows, kids' activities, and interactive games,... for exceptional ambiance.",
    image: srvc2,
  },
  {
    title: "Venue Booking",
    description:
      "From finding the perfect venue to securing the ideal space, we handle every detail of your event's location.",
    image: srvc3,
  },
  {
    title: "Event Planning",
    description:
      "An expert team, managing every detail, from the conception to the execution of your events.",
    image: srvc4,
  },
  {
    title: "Logistics Management",
    description:
      "Skilled logistics, ensuring smooth transport, accommodations, and guest management.",
    image: srvc5,
  },
  {
    title:"Decoration & Styling",
    description:"Professional designers and decorators, transforming your event with unique themes and decorations",
    image:srvc6,
  },
];

const Service = () => {
  return (
    <section id="services" className="scroll-mt-32 bg-[url('./assets/background.jpg')] bg-cover bg-center py-16 px-10 flex flex-col items-center relative">
      <h2 className="text-4xl font-bold text-white mb-10">
        Our <span className="text-cyan-400">Services</span>
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        autoplay={{
          delay: 3000, // time between slides (ms)
          disableOnInteraction: false, // keeps autoplay after user interaction
          pauseOnMouseEnter: true, // pauses when hovering
        }}
        spaceBetween={30}
        slidesPerView={3}
        slidesPerGroup={3}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
        className="w-full max-w-6xl"
      >
        {dataservices.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white flex flex-col rounded-lg shadow-md px-1 py-1  overflow-hidden h-[420px]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[220px] rounded-t-lg object-cover"
              />
              <div className="flex flex-col flex-grow justify-between p-4">
                <div>
                  <h3 className="text-lg text-center font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm mt-2">
                    {service.description}
                  </p>
                </div>
                <a
                  href="https://github.com/chirazhdn/projet1CS"
                  className="text-blue-500 text-sm font-medium flex justify-center items-center space-x-1 hover:underline mt-4"
                >
                  <span>See more</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <button className="prev-btn absolute left-14 top-1/2 transform -translate-y-1/2  text-cyan-500 p-3 rounded-full shadow-md  z-10">
      <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M1.94043 14.9043C0.687095 14.121 0.687092 12.2951 1.94043 11.5117L18.2227 1.33594C20.21 0.0938348 22.3446 2.69401 20.7393 4.40137L15.0352 10.4678C13.5872 12.0076 13.5872 14.4084 15.0352 15.9482L20.7393 22.0137C22.3448 23.721 20.2091 26.3222 18.2217 25.0801L1.94043 14.9043Z" stroke="#00D1FF" stroke-width="2"/>
  </svg>
       </button>
       <button className="next-btn absolute right-14 top-1/2 transform -translate-y-1/2  text-cyan-500 p-3 rounded-full shadow-md  z-10">
       <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.3994 15.6963C21.6527 14.913 21.6528 13.087 20.3994 12.3037L4.11719 2.12793C2.12983 0.885833 -0.0048005 3.48599 1.60059 5.19336L7.30469 11.2598C8.75268 12.7996 8.75268 15.2004 7.30469 16.7402L1.60059 22.8057C-0.00492043 24.513 2.13076 27.1142 4.11816 25.8721L20.3994 15.6963Z" stroke="#00D1FF" stroke-width="2"/>
  </svg>
       </button>
    </section>
  );
};

export default Service;
