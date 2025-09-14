import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RetailerMarketPriceGraph() {
  const { user, api } = useAuth();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseAnalysis = async () => {
      if (user && user.aadhar) {
        try {
          const response = await api.get(`/retailers/${user.aadhar}/purchase-analysis`);
          const analysisData = response.data;

          if (analysisData.length > 0) {
            const labels = analysisData.map(item => item.product_name);
            const marketPrices = analysisData.map(item => item.market_price_per_unit);
            const purchasePrices = analysisData.map(item => item.purchase_price_per_unit);

            setChartData({
              labels,
              datasets: [
                {
                  label: 'Market Price per Unit',
                  data: marketPrices,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Purchase Price per Unit',
                  data: purchasePrices,
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
              ],
            });
          }
        } catch (err) {
          setError('Failed to fetch purchase analysis for graph.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPurchaseAnalysis();
  }, [user, api]);

  if (loading) {
    return <div className="text-center p-4">Loading graph...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Market Price vs. Purchase Price</h3>
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
                text: 'Comparison of Market and Purchase Prices per Unit',
              },
            },
          }}
        />
      ) : (
        <p className="text-slate-700">No data available to display the graph.</p>
      )}
    </div>
  );
}

export default RetailerMarketPriceGraph;