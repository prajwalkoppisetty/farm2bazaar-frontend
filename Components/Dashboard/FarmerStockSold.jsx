import React, { useEffect, useState } from 'react';
import { useAuth } from '../../src/AuthContext'; // Adjust path as needed

function FarmerStockSold() {
  const { user } = useAuth();
  const farmerId = user?.farmer?.id;
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (farmerId) {
      const fetchSoldProducts = async () => {
        try {
          const response = await fetch(`https://farm2bazaar-backend.onrender.com/farmers/${farmerId}/products?status=soldout`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSoldProducts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSoldProducts();
    }
  }, [farmerId]);

  if (loading) {
    return <div className="text-center py-4">Loading sold stock...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Farmer Stock Sold</h3>
      {soldProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-slate-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Product ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">Listed Date</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">₹{product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">{new Date(product.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-600">No sold stock found.</p>
      )}
    </div>
  );
}

export default FarmerStockSold;