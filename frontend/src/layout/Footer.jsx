import * as React from "react";
import FooterLinks from "./FooterLinks";
import FooterServices from "./FooterServices";

const homeLinks = [
  "About Ezyevents",
  "Our Services",
  "Form",
  "Wilaya",
  "Settings",
  "Cash"
];

function Footer() {
  return (
    <div id="contact-us" className="font-[Poppins sans-serif] flex flex-col">
      <div className="flex flex-col items-center pt-32 pb-20 w-full bg-slate-900 max-md:pt-24 max-md:max-w-full">
        <div className="w-full max-w-[1237px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-start w-full font-semibold text-white max-md:mt-10">
               
            <svg width="117" height="65" viewBox="0 0 117 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.54 28.9V39.4H26.64V46.06H12.54V57.16H28.44V64H4.14V22.06H28.44V28.9H12.54Z" fill="white"/>
<path d="M36.713 34.665H43.876V38H32.102V34.723L39.12 25.269H32.131V21.934H43.789V25.211L36.713 34.665ZM62.3896 21.934L52.4426 45.598H48.1216L51.6016 37.594L45.1636 21.934H49.7166L53.8636 33.157L58.0686 21.934H62.3896Z" fill="#00D1FF"/>
<path d="M40.75 60.13L44.95 47.38H49.42L43.27 64H38.17L32.05 47.38H36.55L40.75 60.13ZM67.229 55.33C67.229 55.93 67.189 56.47 67.109 56.95H54.959C55.059 58.15 55.479 59.09 56.219 59.77C56.959 60.45 57.869 60.79 58.949 60.79C60.509 60.79 61.619 60.12 62.279 58.78H66.809C66.329 60.38 65.409 61.7 64.049 62.74C62.689 63.76 61.019 64.27 59.039 64.27C57.439 64.27 55.999 63.92 54.719 63.22C53.459 62.5 52.469 61.49 51.749 60.19C51.049 58.89 50.699 57.39 50.699 55.69C50.699 53.97 51.049 52.46 51.749 51.16C52.449 49.86 53.429 48.86 54.689 48.16C55.949 47.46 57.399 47.11 59.039 47.11C60.619 47.11 62.029 47.45 63.269 48.13C64.529 48.81 65.499 49.78 66.179 51.04C66.879 52.28 67.229 53.71 67.229 55.33ZM62.879 54.13C62.859 53.05 62.469 52.19 61.709 51.55C60.949 50.89 60.019 50.56 58.919 50.56C57.879 50.56 56.999 50.88 56.279 51.52C55.579 52.14 55.149 53.01 54.989 54.13H62.879ZM79.5046 47.14C81.4846 47.14 83.0846 47.77 84.3046 49.03C85.5246 50.27 86.1346 52.01 86.1346 54.25V64H81.9346V54.82C81.9346 53.5 81.6046 52.49 80.9446 51.79C80.2846 51.07 79.3846 50.71 78.2446 50.71C77.0846 50.71 76.1646 51.07 75.4846 51.79C74.8246 52.49 74.4946 53.5 74.4946 54.82V64H70.2946V47.38H74.4946V49.45C75.0546 48.73 75.7646 48.17 76.6246 47.77C77.5046 47.35 78.4646 47.14 79.5046 47.14ZM95.0186 50.83V58.87C95.0186 59.43 95.1486 59.84 95.4086 60.1C95.6886 60.34 96.1486 60.46 96.7886 60.46H98.7386V64H96.0986C92.5586 64 90.7886 62.28 90.7886 58.84V50.83H88.8086V47.38H90.7886V43.27H95.0186V47.38H98.7386V50.83H95.0186ZM108.119 64.27C106.759 64.27 105.539 64.03 104.459 63.55C103.379 63.05 102.519 62.38 101.879 61.54C101.259 60.7 100.919 59.77 100.859 58.75H105.089C105.169 59.39 105.479 59.92 106.019 60.34C106.579 60.76 107.269 60.97 108.089 60.97C108.889 60.97 109.509 60.81 109.949 60.49C110.409 60.17 110.639 59.76 110.639 59.26C110.639 58.72 110.359 58.32 109.799 58.06C109.259 57.78 108.389 57.48 107.189 57.16C105.949 56.86 104.929 56.55 104.129 56.23C103.349 55.91 102.669 55.42 102.089 54.76C101.529 54.1 101.249 53.21 101.249 52.09C101.249 51.17 101.509 50.33 102.029 49.57C102.569 48.81 103.329 48.21 104.309 47.77C105.309 47.33 106.479 47.11 107.819 47.11C109.799 47.11 111.379 47.61 112.559 48.61C113.739 49.59 114.389 50.92 114.509 52.6H110.489C110.429 51.94 110.149 51.42 109.649 51.04C109.169 50.64 108.519 50.44 107.699 50.44C106.939 50.44 106.349 50.58 105.929 50.86C105.529 51.14 105.329 51.53 105.329 52.03C105.329 52.59 105.609 53.02 106.169 53.32C106.729 53.6 107.599 53.89 108.779 54.19C109.979 54.49 110.969 54.8 111.749 55.12C112.529 55.44 113.199 55.94 113.759 56.62C114.339 57.28 114.639 58.16 114.659 59.26C114.659 60.22 114.389 61.08 113.849 61.84C113.329 62.6 112.569 63.2 111.569 63.64C110.589 64.06 109.439 64.27 108.119 64.27Z" fill="white"/>
</svg>
                <div className="mt-9 text-lg">+213 0123 456 789.</div>
                <div className="self-stretch mt-2.5 text-lg">contact@ezeevents.com</div>
                <div 
                  className="mt-4 text-base font-medium text-cyan-400"
                  role="button"
                  
                  tabIndex={0}
                >
                  Connexion
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[19%] max-md:ml-0 max-md:w-full">
              <FooterLinks title="Home" links={homeLinks} />
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <FooterServices />
            </div>
            <div className="flex flex-col ml-5 w-[18%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-10 text-xl font-bold text-white whitespace-nowrap">
                <div className="self-center">Contact</div>


                    <div className="flex mt-9  ">
                        <a href="https://facebook.com" className=" hover:bg-secondary hover:text-white text-secondary p-3 rounded-full transition duration-300">
                            <i className="fab fa-instagram"></i>
                        </a> <a href="https://facebook.com" className=" hover:bg-secondary hover:text-white text-secondary  p-3 rounded-full transition duration-300">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://facebook.com" className=" hover:bg-secondary hover:text-white text-secondary  p-3 rounded-full transition duration-300">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://facebook.com" className=" hover:bg-secondary hover:text-white p-3 text-secondary  rounded-full transition duration-300">
                            <i className="fab fa-tiktok "></i>
                        </a>
                       
                       
                        {/* <a href="#" className="bg-blue-500 hover:bg-secondary text-white p-3 rounded-full transition duration-300">
                            <i className="fab fa-dribbble"></i>
                        </a> */}
                    </div>
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1be9ded57854b339f6977d7b2a243fcb9902e18a4c650c9e7ca9463f93cd1fc?placeholderIfAbsent=true&apiKey=e1e4ef3fc40d42f5a93cb3e416377f5d"
                  alt=""
                  className=" object-contain mt-9 aspect-[6.99] w-[140px]"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex self-stretch mt-36 w-full bg-cyan-400 bg-opacity-80 min-h-[1px] max-md:mt-10 max-md:max-w-full" />
        <div className="flex flex-wrap gap-5 justify-between mt-7 w-full text-xl font-medium text-white max-w-[1233px] max-md:max-w-full">
          <div>© 2024 EzeEvents.</div>
          <div>Mentions légales</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;