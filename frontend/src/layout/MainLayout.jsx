import React from "react";
import Home from "./Home";
import About from "./About";
import Service from "./Service";
import FilterLocation from "./FilterLocation";
import ChooseServ from "./ChooseSer";
import Payment from "./Payment";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Home />
      <About />
      <Service/>
      <FilterLocation/>
      <ChooseServ/>
      <Payment/>
      <Footer/>
    </div>
  );
};

export default MainLayout;
