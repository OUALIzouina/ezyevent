import abImage from '../assets/Frame55.svg';
function About() {
    return (
        <div  id='about-us' 
        className="relative bg-cover scroll-mt-20 bg-center bg-no-repeat h-screen flex items-center justify-center" 
        style={{ backgroundImage: `url(${abImage})` }}
      >
          <section className="py-16 px-6 max-w-7xl mx-auto" >
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Image and Badges */}
              <div className="relative flex justify-center w-full md:w-1/2">
        
              </div>
              {/* Text Content */}
              <div className="text-center md:text-left w-full md:w-1/2 font-poppins  lg:h-[375px]">
                <h3 className="text-primary font-semibold text-2xl mb-2">WHY US?</h3>
                <h2 className="text-3xl md:text-5xl font-medium mb-7">
                  About <span className="text-primary">EzyEvents</span>
                </h2>
                <p className="text-gray-600 text-lg leading-7">
                  At <strong>EzyEvents</strong>, we turn your ideas into unforgettable
                  events. With an expert team and tailor-made services, we ensure
                  flawless organization, whether it's a wedding, conference, or any
                  other occasion. Let us make your event exceptional and stress-free.
                </p>
              </div>
            </div>
            
          </section>
          </div>
    );
  }
  
  export default About;