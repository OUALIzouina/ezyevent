import servImage from '../assets/Group88.svg';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


import srvc2 from "../assets/srvc2.jpg";
import srvc3 from "../assets/srvc3.jpg";
import srvc4 from "../assets/srvc6.jpg";


const dataservices=[
   
      {
        title: "Entertainment & Activities",
        description:"Creative specialists, offering DJ sets, live  shows, kids' activities, and interactive games,... for exceptional ambiance.",
                image: srvc2,
      },
      {
        title: "Decoration & Styling",
        description:" Professional designers and decorators, transforming your event with unique themes and decorations",
        image: srvc3,
      },
      {
        title: "Photography & Videography",
        description:"Experienced experts, capturing moments with high-end cameras and outstanding quality for lasting impressions.",
        image: srvc4,
      },
]

function ChooseServ() {
return (
    <div id="event"
  className="relative w-full font-poppins bg-cover bg-center bg-no-repeat  flex items-center justify-center" 
>
    <div className=" py-12 w-full md:px-16 lg:px-24 ">
      <div className="w-full grid grid-cols-2 ">
        {/* Left Section */}
        <div  className=" w-[70%]  bg-[url('./assets/Group65.jpg')]  bg-right-bottom"  >
        <div className="text-primary">
        <img
          src={servImage}
          alt="Settings Icon"
          className="h-15 w-15"
          />
          </div>
          <h2 className="text-primary font-semibold text-lg mb-2">Settings</h2>
          <h1 className="text-4xl font-semibold text-gray-800 ">
            Choose your</h1>
          <h3 className="text-4xl font-semibold text-secondary ">services</h3>
          <p className="mt-6 text-costumgray text-lg">
            Browse a full range of customizable services, including venue
            booking, catering, decoration, entertainment, and guest
            management. Select only what you need to fit your budget while
            creating a memorable event. Then, check real-time availability to
            ensure your selected services are ready for your chosen date,
            avoiding conflicts and streamlining your planning process.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full  h-full flex  ">
        <Swiper
  modules={[Navigation, Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  spaceBetween={40}
  slidesPerView={1}
  loop={true}
  className="w-full "
>
  {dataservices.map((card, index) => (
    <SwiperSlide key={index}>
      <div className="relative w-full flex max-w-md ">
        {/* Wrap both divs in a tall enough container */}
        <div className="relative w-full  h-[580px] flex justify-between items-center">
          {/* Back div (shadow image) */}
          <div className="absolute -top-8 left-[40%] w-[95%] h-[78%]  rounded-lg overflow-hidden z-0 shadow-md">
            <img
              src={card.image}
              alt={card.title}
              className="object-cover w-full h-full  rounded-lg "
            />
          </div>

          {/* Front div (main card) */}
          <div className="relative z-10 font-poppins text-center bg-white rounded-lg shadow-lg overflow-hidden w-full">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-64 object-cover p-1 rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-costumgray mb-3">
                {card.title}
              </h3>
              <p className="text-[#999999]">{card.description}</p>
              <a
                href="https://github.com/chirazhdn/projet1CS"
                className="text-primary font-medium mt-4 inline-block hover:underline"
              >
                See more →
              </a>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>







      </div>
  </div>
  </div>
  );
}

export default ChooseServ;