import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';
import { FaBox, FaChartLine, FaRupeeSign, FaTag } from 'react-icons/fa';

const FarmerAnalytics = () => {
  const { user, api } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (user && user.id) {
        try {
          const response = await api.get(`/farmers/${user.id}/analytics`);
          setAnalytics(response.data);
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

  const stats = [
    {
      icon: <FaBox className="text-3xl text-blue-500" />,
      label: 'Total Listed Stock',
      value: analytics.total_listed_stock,
    },
    {
      icon: <FaChartLine className="text-3xl text-green-500" />,
      label: 'Total Present Stock',
      value: analytics.total_present_stock,
    },
    {
      icon: <FaRupeeSign className="text-3xl text-yellow-500" />,
      label: 'Total Revenue',
      value: `₹${analytics.total_revenue.toFixed(2)}`,
    },
    {
      icon: <FaTag className="text-3xl text-purple-500" />,
      label: 'Most Sold Category',
      value: analytics.most_sold_category || 'N/A',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Farmer Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-100 rounded-lg">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerAnalytics;