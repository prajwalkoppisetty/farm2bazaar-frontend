import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessMessage from "../Components/SuccessMessage";
import { useAuth } from "../src/AuthContext"; // Import useAuth

export default function Signup() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "farmer";

  const [activeTab, setActiveTab] = useState(role);

  // Optional: sync tab if the query param changes
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
            {activeTab === "farmer" && <FarmerForm />}
            {activeTab === "retailer" && <RetailerForm />}
          </div>
        </div>
      </div>
    </main>
  );
}

function FarmerForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Import useAuth, though not directly used for redirection here
  const [formData, setFormData] = useState({
    farmername: "",
    mobilenumber: "",
    password: "",
    gender: "",
    State: "",
    City: "",
    aadhar: "",
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
        "https://farm2bazaar-backend.onrender.com/create-farmer",
        formData
      );
      console.log(response.data);
      // If signup automatically logs in, you would call login here:
      // login(response.data.farmer, "farmer", response.data.token);
      setSuccessMessage("Farmer registered successfully!");
      setTimeout(() => {
        navigate("/signin?role=farmer");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error creating farmer:", error);
      if (error.response && error.response.data && error.response.data.description) {
        setError(error.response.data.description);
      } else {
        setError("An unexpected error occurred during registration.");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">Farmer Signup</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />}

      <div>
        <label className="block text-base font-medium text-slate-600">Name</label>
        <input
          type="text"
          name="farmername"
          value={formData.farmername}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
          placeholder="Full Name"
          required
        />
      </div>

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

      <div>
        <label className="block text-base font-medium text-slate-600">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-slate-600">State</label>
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
            placeholder="State"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium text-slate-600">City</label>
          <input
            type="text"
            name="City"
            value={formData.City}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
            placeholder="City"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-slate-600">Aadhar Number</label>
        <input
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 text-base"
          placeholder="12-digit Aadhar number"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 text-lg"
      >
        Sign Up
      </button>

      <p className="text-center text-base text-slate-600">
        Already have an account?{" "}
        <Link to="/signin?role=farmer" className="font-semibold text-emerald-600 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}

function RetailerForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Import useAuth, though not directly used for redirection here
  const [formData, setFormData] = useState({
    enterprise_name: "",
    owner_name: "",
    mobilenumber: "",
    password: "",
    State: "",
    City: "",
    aadhar: "",
    Gstin: "",
    Pan: "",
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
        "https://farm2bazaar-backend.onrender.com/create-retailer",
        formData
      );
      console.log(response.data);
      // If signup automatically logs in, you would call login here:
      // login(response.data.retailer, "retailer", response.data.token);
      setSuccessMessage("Retailer registered successfully!");
      setTimeout(() => {
        navigate("/signin?role=retailer");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error creating retailer:", error);
      if (error.response && error.response.data && error.response.data.description) {
        setError(error.response.data.description);
      } else {
        setError("An unexpected error occurred during registration.");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">Retailer Signup</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />}

      <div>
        <label className="block text-base font-medium text-slate-600">Enterprise Name</label>
        <input
          type="text"
          name="enterprise_name"
          value={formData.enterprise_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="Your enterprise's name"
          required
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-600">Owner's Name</label>
        <input
          type="text"
          name="owner_name"
          value={formData.owner_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="Full Name"
          required
        />
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-slate-600">State</label>
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
            placeholder="State"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium text-slate-600">City</label>
          <input
            type="text"
            name="City"
            value={formData.City}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
            placeholder="City"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-slate-600">Aadhar Number</label>
        <input
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="12-digit Aadhar number"
          required
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-600">GSTIN Number</label>
        <input
          type="text"
          name="Gstin"
          value={formData.Gstin}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="15-digit GSTIN"
          required
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-600">PAN</label>
        <input
          type="text"
          name="Pan"
          value={formData.Pan}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-base"
          placeholder="10-character PAN"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-red-600 text-white py-3 font-semibold hover:bg-red-700 text-lg"
      >
        Sign Up
      </button>

      <p className="text-center text-base text-slate-600">
        Already have an account?{" "}
        <Link to="/signin?role=retailer" className="font-semibold text-red-600 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
