import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FarmerMarketPriceGraph() {
  const { user, api } = useAuth();
  const [chartData, setChartData] = useState(null);
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

  const handleGenerateGraph = async () => {
    if (!selectedCategory || !selectedProduct) {
      setError('Please select both a category and a product.');
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
      const analysisData = response.data;

      if (analysisData.length > 0) {
        const labels = analysisData.map(item => new Date(item.transaction_date).toLocaleDateString());
        const marketPrices = analysisData.map(item => item.market_rate_per_unit);
        const soldPrices = analysisData.map(item => item.sold_price_per_unit);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Market Price per Unit',
              data: marketPrices,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Sold Price per Unit',
              data: soldPrices,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
          ],
        });
      } else {
        setChartData(null);
      }
    } catch (err) {
      setError('Failed to fetch profit analysis for graph.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Market Price vs. Sold Price Graph</h3>
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
          onClick={handleGenerateGraph}
          className="self-end bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Graph'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Comparison of Market and Sold Prices per Unit',
              },
            },
          }}
        />
      ) : (
        <p className="text-slate-700">Select a product and category to display the graph.</p>
      )}
    </div>
  );
}

export default FarmerMarketPriceGraph;