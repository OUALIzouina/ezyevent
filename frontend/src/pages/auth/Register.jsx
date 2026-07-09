// import { Link } from 'react-router-dom';
import Btn from '../../components/Btn';
import ppImage from "../../assets/pp.jpeg";
import logoImage from "../../assets/logo1.png"
function Register() {
  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //     <div className="bg-white w-10/12 lg:w-6/12 rounded-3xl shadow-lg p-12 text-center">
  //       <h2 className="text-4xl font-bold text-customPurple mb-8">
  //         Join <span className="text-black">EzyEvents</span>
  //       </h2>
  //       <div className="flex flex-col md:flex-row gap-6 justify-center">
  //         <Link
  //           to="/register/client"
  //           className="flex-1 border-2 border-customPurple rounded-2xl p-8 hover:bg-indigo-50 transition"
  //         >
  //           <h3 className="text-2xl font-semibold mb-2">I'm a Client</h3>
  //           <p className="text-gray-500">I want to plan an event and book service providers</p>
  //         </Link>
  //         <Link
  //           to="/register/provider"
  //           className="flex-1 border-2 border-customPurple rounded-2xl p-8 hover:bg-indigo-50 transition"
  //         >
  //           <h3 className="text-2xl font-semibold mb-2">I'm a Provider</h3>
  //           <p className="text-gray-500">I offer a service and want to get booked for events</p>
  //         </Link>
  //       </div>
  //       <p className="mt-8 text-sm text-gray-600">
  //         Already have an account? <Link to="/login" className="text-customPurple hover:underline">Log in</Link>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center" 
      style={{ backgroundImage:`url(${ppImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
       {/* Logo */}
       <div className="absolute top-1 left-5">
          <img 
            src={logoImage}
            alt="EzyEvents Logo" 
            className="h-16" 
          />
        </div>
      {/* Content */}
      <div className="relative text-center text-white px-6 w-full">
    
        {/* Title */}
        <h3 className="text-secondary text-2xl font-semibold uppercase mb-2">Who Are You?</h3>
    
        {/* Main Text */}
        <p className="text-3xl md:text-5xl  font-medium max-w-6xl mx-auto mb-8"style={{ lineHeight: "1.5" }}>
          Connect as a Client to book or plan an event, or as a Service Provider to offer your services such as catering, venue rentals, or event management.
        </p>
    
        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-24 mt-12">
    {/* Client Button */}
    <Btn to="/register/client"
          
          className="flex items-center md:text-2xl justify-center gap-9 bg-transparent border-2 border-secondary font-medium py-1.5 px-16 rounded-full transition duration-300 text-secondary hover:bg-secondary hover:text-white"
        >
          <span>Client</span>
          <i class="fas fa-arrow-right"></i> 
        </Btn>
    {/* Service Provider Button */}
    
    <Btn to="/register/provider"
          
          className="flex items-center md:text-2xl justify-center gap-9 bg-transparent border-2 border-secondary font-medium py-1.5 px-16 rounded-full transition duration-300 text-secondary hover:bg-secondary hover:text-white"
        >
          <span>Service Provider</span>
          <i class="fas fa-arrow-right"></i> 
        </Btn>
    
    
    </div>
    
      </div>
    </div>
      );

}

export default Register;
