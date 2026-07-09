import * as React from "react";

const FooterLinks = ({ title, links }) => {
  return (
    <div className="flex flex-col items-start mt-10 text-lg font-medium text-white">
      <div className="text-xl font-bold">{title}</div>
      {links.map((link, index) => (
        <div 
          key={index}
          className="mt-3 leading-4"
          role="link"
          tabIndex={0}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;