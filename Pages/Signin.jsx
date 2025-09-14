import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessMessage from "../Components/SuccessMessage";
import { useAuth } from "../src/AuthContext"; // Import useAuth

export default function Signin() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "farmer";

  const [activeTab, setActiveTab] = useState(role);

  // Keep tab in sync if the query param changes (optional)
  useEffect(() => {
    setActiveTab(role);
  }, [role]);

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="bg-slate-100 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("farmer")}
              className={`w-1/2 rounded-full py-3 text-center font-semibold transition-colors text-lg ${
                activeTab === "farmer"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Farmer
            </button>
            <button
              onClick={() => setActiveTab("retailer")}
              className={`w-1/2 rounded-full py-3 text-center font-semibold transition-colors text-lg ${
                activeTab === "retailer"
                  ? "bg-red-600 text-white"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Retailer
            </button>
          </div>

          <div className="mt-8">
            {activeTab === "farmer" && <FarmerSignInForm />}
            {activeTab === "retailer" && <RetailerSignInForm />}
          </div>
        </div>
      </div>
    </main>
  );
}

function FarmerSignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext
  const [formData, setFormData] = useState({
    mobilenumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages
    try {
      const response = await axios.post(
        "https://farm2bazaar-backend.onrender.com/login-farmer",
        formData
      );
      console.log(response.data);
      login(response.data.farmer, "farmer", response.data.token); // Store user data and token
      setSuccessMessage("Farmer logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error logging in farmer:", error);
      if (error.response && error.response.data && error.response.data.description) {
        setError(error.response.data.description);
      } else {
        setError("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">Farmer Sign In</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />}

      <div>
        <label className="block text-base font-medium text-slate-600">Mobile Number</label>
        <input
          type="tel"
          name="mobilenumber"
          value={formData.mobilenumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
          placeholder="10-digit mobile number"
          required
        />
      </div>
      <div>
        <label className="block text-base font-medium text-slate-600">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 text-lg"
      >
        Sign In
      </button>
      <p className="text-center text-base text-slate-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup?role=farmer" className="font-semibold text-emerald-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

function RetailerSignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext
  const [formData, setFormData] = useState({
    mobilenumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages
    try {
      const response = await axios.post(
        "https://farm2bazaar-backend.onrender.com/login-retailer",
        formData
      );
      console.log(response.data);
      login(response.data.retailer, "retailer", response.data.token); // Store user data and token
      setSuccessMessage("Retailer logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error logging in retailer:", error);
      if (error.response && error.response.data && error.response.data.description) {
        setError(error.response.data.description);
      } else {
        setError("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">Retailer Sign In</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />}

      <div>
        <label className="block text-base font-medium text-slate-600">Mobile Number</label>
        <input
          type="tel"
          name="mobilenumber"
          value={formData.mobilenumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="10-digit mobile number"
          required
        />
      </div>
      <div>
        <label className="block text-base font-medium text-slate-600">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-red-600 text-white py-3 font-semibold hover:bg-red-700 text-lg"
      >
        Sign In
      </button>
      <p className="text-center text-base text-slate-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup?role=retailer" className="font-semibold text-red-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
