import * as React from "react";

const services = [
  "Event Planning",
  "Decoration & Styling",
  "Venue Booking",
  "Photography & Videography",
  "Logistics Management",
  "Entertainment & Activities",
  "Catering Services",
  "Security & Access Control",
  "Event Technologies services"
];

const FooterServices = () => {
  return (
    <div className="flex flex-col grow items-start mt-10 text-lg font-medium text-white">
      <div className="text-xl font-bold">Services</div>
      {services.map((service, index) => (
        <div 
          key={index}
          className="mt-3 leading-3"
          role="link"
          tabIndex={0}
        >
          {service}
        </div>
      ))}
    </div>
  );
};

export default FooterServices;