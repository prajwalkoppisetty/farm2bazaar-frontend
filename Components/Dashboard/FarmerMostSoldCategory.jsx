import React, { useState, useEffect } from "react";
import { useAuth } from "../../src/AuthContext";
import axios from "axios";

function FarmerMostSoldCategory() {
  const { user } = useAuth(); // Contains farmer info from login
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch analytics data
  const fetchAnalytics = async () => {
    if (!user?.id) {
      setError("Farmer ID is missing. Please log in again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://farm2bazaar-backend.onrender.com/farmers/${user.id}/analytics`
      );
      setAnalytics(response.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to fetch analytics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics on component mount
  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
        Farmer Most Sold Category
      </h3>
      {loading ? (
        <p className="text-center text-lg text-slate-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : analytics ? (
        <div>
          <p className="text-lg text-slate-700 mb-4">
            <strong>Most Sold Category:</strong>{" "}
            {analytics.most_sold_category || "No sales data available"}
          </p>
          <p className="text-lg text-slate-700 mb-4">
            <strong>Total Listed Stock:</strong> {analytics.total_listed_stock}
          </p>
          <p className="text-lg text-slate-700 mb-4">
            <strong>Total Present Stock:</strong> {analytics.total_present_stock}
          </p>
          <p className="text-lg text-slate-700 mb-4">
            <strong>Total Revenue:</strong> ₹{analytics.total_revenue.toFixed(2)}
          </p>
          <h4 className="text-xl font-semibold text-emerald-700 mb-3">
            Category-wise Sales:
          </h4>
          <ul className="list-disc pl-6 text-slate-700">
            {Object.entries(analytics.category_sales).map(
              ([category, quantity]) => (
                <li key={category}>
                  <strong>{category}:</strong> {quantity} units sold
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p className="text-center text-lg text-slate-600">
          No analytics data available.
        </p>
      )}
    </div>
  );
}

export default FarmerMostSoldCategory;