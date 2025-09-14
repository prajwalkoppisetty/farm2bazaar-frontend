import React, { useState, useEffect } from "react";
import { useAuth } from "../../src/AuthContext";
import axios from "axios"; // Ensure axios is imported

function FarmerHistory() {
  const { user } = useAuth(); // Contains farmer info from login
  const [activeTab, setActiveTab] = useState("productHistory"); // "productHistory" or "transactionHistory"
  const [productHistory, setProductHistory] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product history
  const fetchProductHistory = async () => {
    if (!user?.id) {
      setError("Farmer ID is missing. Please log in again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://farm2bazaar-backend.onrender.com/farmers/${user.id}/product-history`
      );
      setProductHistory(response.data);
    } catch (err) {
      console.error("Error fetching product history:", err);
      setError("Failed to fetch product history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    if (!user?.id) {
      setError("Farmer ID is missing. Please log in again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://farm2bazaar-backend.onrender.com/farmers/${user.id}/transactions`
      );
      setTransactionHistory(response.data);
    } catch (err) {
      console.error("Error fetching transaction history:", err);
      setError("Failed to fetch transaction history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on the active tab
  useEffect(() => {
    if (activeTab === "productHistory") {
      fetchProductHistory();
    } else if (activeTab === "transactionHistory") {
      fetchTransactionHistory();
    }
  }, [activeTab]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6">
        Farmer History
      </h2>

      {/* Sliding Tabs */}
      <div className="flex border-b border-emerald-300 mb-6">
        <button
          onClick={() => setActiveTab("productHistory")}
          className={`flex-1 text-lg font-semibold py-3 text-center ${
            activeTab === "productHistory"
              ? "border-b-4 border-emerald-600 text-emerald-700"
              : "text-slate-600 hover:text-emerald-700"
          }`}
        >
          Product History
        </button>
        <button
          onClick={() => setActiveTab("transactionHistory")}
          className={`flex-1 text-lg font-semibold py-3 text-center ${
            activeTab === "transactionHistory"
              ? "border-b-4 border-emerald-600 text-emerald-700"
              : "text-slate-600 hover:text-emerald-700"
          }`}
        >
          Transaction History
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-lg text-slate-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : activeTab === "productHistory" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productHistory.map((product) => (
            <div
              key={product.product_id}
              className="bg-emerald-50 rounded-lg shadow-md p-4"
            >
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                {product.name}
              </h3>
              <p className="text-slate-600">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-slate-600">
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p className="text-slate-600">
                <strong>Quantity:</strong> {product.quantity} in stock
              </p>
              <p className="text-slate-600">
                <strong>Listed Date:</strong>{" "}
                {new Date(product.listed_date).toLocaleDateString()}
              </p>
              <p className="text-slate-600">
                <strong>Last Updated:</strong>{" "}
                {product.last_updated
                  ? new Date(product.last_updated).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactionHistory.map((transaction) => (
            <div
              key={transaction.transaction_id}
              className="bg-emerald-50 rounded-lg shadow-md p-4"
            >
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                {transaction.product_name}
              </h3>
              <p className="text-slate-600">
                <strong>Category:</strong> {transaction.category}
              </p>
              <p className="text-slate-600">
                <strong>Quantity Sold:</strong> {transaction.quantity_sold}
              </p>
              <p className="text-slate-600">
                <strong>Payment Type:</strong> {transaction.payment_type}
              </p>
              <p className="text-slate-600">
                <strong>Payment Amount:</strong> ₹{transaction.payment_amount}
              </p>
              <p className="text-slate-600">
                <strong>Sold Date:</strong>{" "}
                {new Date(transaction.sold_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FarmerHistory;