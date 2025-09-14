import React from 'react';
import { useAuth } from '../src/AuthContext';
import { Navigate } from 'react-router-dom';
import { FaUser, FaPhone, FaVenusMars, FaMapMarkerAlt, FaIdCard, FaBuilding, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const { isLoggedIn, user, userRole } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  const renderFarmerProfile = () => (
    <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-8 rounded-xl shadow-lg border border-green-300">
      <h2 className="text-4xl font-extrabold text-emerald-800 mb-6 text-center">Farmer Profile</h2>
      <div className="space-y-5 text-xl text-slate-700">
        <p className="flex items-center"><FaUser className="mr-3 text-green-600" /> <strong>Name:</strong> <span className="ml-2 font-semibold">{user.farmername}</span></p>
        <p className="flex items-center"><FaPhone className="mr-3 text-green-600" /> <strong>Mobile Number:</strong> <span className="ml-2 font-semibold">{user.mobilenumber}</span></p>
        <p className="flex items-center"><FaVenusMars className="mr-3 text-green-600" /> <strong>Gender:</strong> <span className="ml-2 font-semibold">{user.gender}</span></p>
        <p className="flex items-center"><FaMapMarkerAlt className="mr-3 text-green-600" /> <strong>Location:</strong> <span className="ml-2 font-semibold">{user.City}, {user.State}</span></p>
        <p className="flex items-center"><FaIdCard className="mr-3 text-green-600" /> <strong>Aadhar:</strong> <span className="ml-2 font-semibold">{user.aadhar}</span></p>
      </div>
    </div>
  );

  const renderRetailerProfile = () => (
    <div className="bg-gradient-to-br from-blue-100 to-cyan-200 p-8 rounded-xl shadow-lg border border-blue-300">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">Retailer Profile</h2>
      <div className="space-y-5 text-xl text-slate-700">
        <p className="flex items-center"><FaBuilding className="mr-3 text-blue-600" /> <strong>Enterprise Name:</strong> <span className="ml-2 font-semibold">{user.enterprise_name}</span></p>
        <p className="flex items-center"><FaUser className="mr-3 text-blue-600" /> <strong>Owner Name:</strong> <span className="ml-2 font-semibold">{user.owner_name}</span></p>
        <p className="flex items-center"><FaPhone className="mr-3 text-blue-600" /> <strong>Mobile Number:</strong> <span className="ml-2 font-semibold">{user.mobilenumber}</span></p>
        <p className="flex items-center"><FaMapMarkerAlt className="mr-3 text-blue-600" /> <strong>Location:</strong> <span className="ml-2 font-semibold">{user.City}, {user.State}</span></p>
        <p className="flex items-center"><FaIdCard className="mr-3 text-blue-600" /> <strong>Aadhar:</strong> <span className="ml-2 font-semibold">{user.aadhar}</span></p>
        <p className="flex items-center"><FaBriefcase className="mr-3 text-blue-600" /> <strong>GSTIN:</strong> <span className="ml-2 font-semibold">{user.Gstin}</span></p>
        <p className="flex items-center"><FaEnvelope className="mr-3 text-blue-600" /> <strong>PAN:</strong> <span className="ml-2 font-semibold">{user.Pan}</span></p>
      </div>
    </div>
  );

  return (
    <main className="bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-200">
          <h1 className="text-5xl font-extrabold text-center mb-10 text-slate-800">Your Profile</h1>
          {userRole === 'farmer' ? renderFarmerProfile() : renderRetailerProfile()}
        </div>
      </div>
    </main>
  );
};

export default Profile;