import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';
import { FaShoppingCart, FaWallet } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RetailerAnalytics = () => {
  const { user, api } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (user && user.aadhar) {
        try {
          const response = await api.get(`/retailers/${user.aadhar}/purchase-analysis`);
          const data = response.data;

          const totalProductsPurchased = data.length;
          const totalAmountSpent = data.reduce((sum, item) => sum + item.total_purchase_amount, 0);

          const categorySpending = data.reduce((acc, item) => {
            const { category, total_purchase_amount } = item;
            if (!acc[category]) {
              acc[category] = 0;
            }
            acc[category] += total_purchase_amount;
            return acc;
          }, {});

          setAnalytics({
            totalProductsPurchased,
            totalAmountSpent,
            categorySpending,
          });
        } catch (err) {
          setError('Failed to fetch analytics data.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAnalytics();
  }, [user, api]);

  if (loading) {
    return <div className="text-center p-4">Loading analytics...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!analytics) {
    return <div className="text-center p-4">No analytics data available.</div>;
  }

  const pieChartData = {
    labels: Object.keys(analytics.categorySpending),
    datasets: [
      {
        label: 'Amount Spent',
        data: Object.values(analytics.categorySpending),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Retailer Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center p-4 bg-gray-100 rounded-lg">
          <div className="mr-4">
            <FaShoppingCart className="text-3xl text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600">Total Products Purchased</p>
            <p className="text-xl font-semibold">{analytics.totalProductsPurchased}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-100 rounded-lg">
          <div className="mr-4">
            <FaWallet className="text-3xl text-green-500" />
          </div>
          <div>
            <p className="text-gray-600">Total Amount Spent</p>
            <p className="text-xl font-semibold">₹{analytics.totalAmountSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Category Spending</h3>
        <div style={{ height: '300px' }}>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default RetailerAnalytics;