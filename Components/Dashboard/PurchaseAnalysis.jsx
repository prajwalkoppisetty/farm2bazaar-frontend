import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';

const PurchaseAnalysis = () => {
  const { user, api } = useAuth();
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (user && user.aadhar) {
        try {
          const response = await api.get(`/retailers/${user.aadhar}/purchase-analysis`);
          setAnalysis(response.data);
        } catch (err) {
          setError('Failed to fetch purchase analysis.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAnalysis();
  }, [user, api]);

  if (loading) {
    return <div className="text-center p-4">Loading purchase analysis...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Purchase Analysis</h2>
      {analysis.length === 0 ? (
        <p>No purchase analysis available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Farmer Name</th>
                <th className="py-2 px-4 border-b">Purchase Price/Unit</th>
                <th className="py-2 px-4 border-b">Market Price/Unit</th>
                <th className="py-2 px-4 border-b">Price Difference/Unit</th>
                <th className="py-2 px-4 border-b">Quantity Bought</th>
                <th className="py-2 px-4 border-b">Total Purchase Amount</th>
                <th className="py-2 px-4 border-b">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {analysis.map((item) => (
                <tr key={item.order_id}>
                  <td className="py-2 px-4 border-b text-center">{item.product_name}</td>
                  <td className="py-2 px-4 border-b text-center">{item.category}</td>
                  <td className="py-2 px-4 border-b text-center">{item.farmer_name}</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.purchase_price_per_unit.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {item.market_price_per_unit !== 'N/A' ? `₹${item.market_price_per_unit.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className={`py-2 px-4 border-b text-center ${item.price_difference_per_unit > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {item.price_difference_per_unit !== 'N/A' ? `₹${item.price_difference_per_unit.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{item.quantity_bought}</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.total_purchase_amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(item.purchase_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseAnalysis;