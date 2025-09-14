import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';

const ProductProfitAnalysis = () => {
  const { user, api } = useAuth();
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (user && user.id) {
        try {
          const response = await api.get(`/farmers/${user.id}/products`);
          const uniqueCategories = [...new Set(response.data.map(p => p.category))];
          setCategories(uniqueCategories);
          setProducts(response.data);
        } catch (err) {
          console.error('Failed to fetch products for categories', err);
        }
      }
    };
    fetchProducts();
  }, [user, api]);

  const handleAnalysis = async () => {
    if (!selectedCategory || !selectedProduct) {
      setError('Please select a category and a product.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/farmers/${user.id}/product-profit-analysis`, {
        params: {
          category: selectedCategory,
          product_name: selectedProduct,
        },
      });
      setAnalysis(response.data);
    } catch (err) {
      setError('Failed to fetch profit analysis.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Profit Analysis</h2>
      <div className="flex items-center mb-4 space-x-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct('');
            }}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            disabled={!selectedCategory}
          >
            <option value="">Select Product</option>
            {filteredProducts.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <button
          onClick={handleAnalysis}
          className="self-end bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {analysis.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Market Rate/Unit</th>
                <th className="py-2 px-4 border-b">Sold Price/Unit</th>
                <th className="py-2 px-4 border-b">Quantity Sold</th>
                <th className="py-2 px-4 border-b">Profit/Loss</th>
                <th className="py-2 px-4 border-b">Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {analysis.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">{item.product_name}</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.market_rate_per_unit.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.sold_price_per_unit.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{item.quantity_sold}</td>
                  <td className={`py-2 px-4 border-b text-center ${item.profit_or_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ₹{item.profit_or_loss.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{new Date(item.transaction_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductProfitAnalysis;