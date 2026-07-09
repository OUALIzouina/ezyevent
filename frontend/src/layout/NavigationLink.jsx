import * as React from "react";

export default function NavigationLink({ value ,label}) {
  return (
  
    <a       className=" font-[Poppins sans-serif] font-[500] text-[16px] leading-[24px] text-white  my-auto  "
    href={value}> {label}</a>
  );
}
