import React, { useState, useEffect } from "react";
import { useAuth } from "../../src/AuthContext";
import axios from "axios";

function RetailerStockBought() {
  const { user } = useAuth(); // Contains retailer info from login
  const [stockBought, setStockBought] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch stock bought this month
  const fetchStockBought = async () => {
    if (!user?.aadhar) {
      setError("Retailer ID is missing. Please log in again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://farm2bazaar-backend.onrender.com/retailers/${user.aadhar}/stock-bought-this-month`
      );
      setStockBought(response.data);
    } catch (err) {
      console.error("Error fetching stock bought this month:", err);
      setError("Failed to fetch stock bought this month. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStockBought();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
        Stock Bought This Month
      </h3>
      {loading ? (
        <p className="text-center text-lg text-slate-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : stockBought.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockBought.map((transaction) => (
            <div
              key={transaction.order_id}
              className="bg-emerald-50 rounded-lg shadow-md p-4"
            >
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                {transaction.product_name}
              </h3>
              <p className="text-slate-600">
                <strong>Category:</strong> {transaction.category}
              </p>
              <p className="text-slate-600">
                <strong>Farmer:</strong> {transaction.farmer_name}
              </p>
              <p className="text-slate-600">
                <strong>Quantity:</strong> {transaction.quantity}
              </p>
              <p className="text-slate-600">
                <strong>Payment Type:</strong> {transaction.payment_type}
              </p>
              <p className="text-slate-600">
                <strong>Payment Amount:</strong> ₹{transaction.payment_amount}
              </p>
              <p className="text-slate-600">
                <strong>Purchase Date:</strong> {transaction.purchase_date}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-slate-600">
          No stock bought this month.
        </p>
      )}
    </div>
  );
}

export default RetailerStockBought;