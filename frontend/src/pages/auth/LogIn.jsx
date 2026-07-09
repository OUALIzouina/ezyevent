import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Btn from '../../components/Btn';
import eyeImage from "../../assets/eye.svg";
import ppImage from "../../assets/pp.jpeg";
import logoImage from "../../assets/logo1.png"


function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await login(formData.email, formData.password);
      navigate(`/${data.role}-dashboard`);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white w-10/12 lg:w-8/11 flex rounded-3xl shadow-lg overflow-hidden">
//         <div className="w-2/3 flex items-center justify-center bg-white p-10 mx-auto">
//           <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
//             <h2 className="text-5xl font-bold text-center text-customPurple">
//               Log <span className="text-black">In</span>
//             </h2>

//             <input
//               value={formData.email}
//               onChange={handleChange}
//               type="email"
//               name="email"
//               placeholder="Email Address*"
//               className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-200"
//               required
//             />

//             <div className="relative">
//               <input
//                 value={formData.password}
//                 onChange={handleChange}
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password*"
//                 className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-200"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 px-3 text-gray-600"
//               >
//                 {showPassword ? '🙈' : '👁'}
//               </button>
//             </div>

//             {error && <div className="text-red-500 text-center">{error}</div>}

//             <div className="flex justify-center">
//               <Btn type="submit" text={submitting ? 'Logging in...' : 'Connexion'} variant="primary" />
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Not registered yet?{' '}
//                 <Link to="/register" className="text-customPurple hover:underline">
//                   Create an account
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LogIn;

<div className="min-h-screen flex items-center justify-center bg-gray-100 ">
<div className="bg-white w-10/12 lg:w-8/11 flex rounded-3xl shadow-lg overflow-hidden">
  <div className="relative w-3/6 lg:h-[900px]">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ppImage})` }}
    ></div>
    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    <div className="absolute top-1 left-3">
      <img src={logoImage} alt="EzyEvents Logo" className="h-14" />
    </div>
  </div>
  {/* Right Section with Form */}
  <div className="w-2/3 flex items-center justify-center bg-white p-10">



    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">

      <h2 className="text-5xl font-bold text-center text-customPurple">
        Log <span className="text-black">In</span>
      </h2>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
         value={formData.email}
         onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Email Address*"
          className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
           value={formData.password}
           onChange={handleChange}
           type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password*"
          className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-200"
          required

        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 text-gray-600"
        >
          {showPassword ? "🙈" : <img src={eyeImage} alt="Show password" className="h-6 w-6" />}
        </button>
      </div>
      {/* Forgot Password Link */}
      <div className="text-right">
        <a
          href="/forgot-password"
          className="text-sm text-customPurple hover:underline"
        >
          Forgot your password?
        </a>
      </div>
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      {/* Submit Button */}
      <div className="flex justify-center">
        <Btn
         type="submit" text={submitting ? 'Logging in...' : 'Connexion'}
          variant="primary"
          className="hover:outline-none text-white bg-primary hover:bg-primary hover:ring-2 hover:ring-primary"
        />
      </div>
      {/* Footer with Registration Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Not registered yet?{" "}
          <Link to="/register">
            <span className="text-customPurple hover:underline">
              Create an account
            </span>
          </Link>
        </p>
      </div>
    </form>





  </div>
</div>
</div>
);
}

export default LogIn;

