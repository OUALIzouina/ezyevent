import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/api";
import Btn from "../../components/Btn";

function RegisterClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    wilaya: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await auth.registerClient(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-10/12 lg:w-8/12 rounded-3xl shadow-lg p-10">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-center text-customPurple mb-6">
            Create your <span className="text-black">client account</span>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First name*"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-400 rounded-lg p-3"
            />
            <input
              name="lastName"
              placeholder="Last name*"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-400 rounded-lg p-3"
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password* (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full border border-gray-400 rounded-lg p-3"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg p-3"
          />
          <input
            name="wilaya"
            placeholder="Wilaya"
            value={formData.wilaya}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg p-3"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg p-3"
          />

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="flex justify-center pt-2">
            <Btn
              type="submit"
              text={submitting ? "Creating..." : "Create account"}
              variant="primary"
            />
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-customPurple hover:underline">
              Log in
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Are you a service provider?{" "}
            <Link
              to="/register/provider"
              className="text-customPurple hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterClient;
