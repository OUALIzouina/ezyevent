import React from "react";
import Navbar  from "./Navbar";
import bg from "../assets/background.jpg";
import Btn from "../components/Btn";


const Home = () => {
  return (
    <section id="/"
    style={{ backgroundImage: `url(${bg})` }}
    className="w-[100%] px-16   h-screen bg-cover bg-center">
        <Navbar/> 
    <div className="font-[Poppins sans-serif] pt-[170px]   text-white flex flex-col items-start  mb-0 ml-6 max-w-full  w-[50%] max-md:mt-10 max-md:mb-2.5">
      <div className=" font-[500] text-[25px] leading-[37,5px] text-[#00D1FF]">
        EVENTS ORGANIZATION
      </div>
      <h1 className="self-stretch mt-[10px] text-5xl font-semibold leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[59px]">
        Sophisticated tools, extraordinary events, remarkable moments.
      </h1>
      <div className="font-[500] text-[18px] leading-[27px] mt-8 max-md:max-w-full">
        Streamlined tools for effortless event management, from ticketing to
        execution—designed to make your events unforgettable.
      </div>
      {/* <Link to="/connexion"> */} 
      <Btn to="/login" text="Create an event" variant="primary" className="mt-16"  />


     
      {/* </Link> */}
    </div>
    </section>
  );
};

export default Home;
