import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/AuthContext';
import { FaFilePdf } from 'react-icons/fa';

const FarmerTransactions = () => {
  const { user, api, backendUrl } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user && user.id) {
        try {
          const response = await api.get(`/farmers/${user.id}/transactions`);
          setTransactions(response.data);
        } catch (err) {
          setError('Failed to fetch transactions.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTransactions();
  }, [user, api]);

  const handleGenerateReport = () => {
    if (!fromDate || !toDate) {
      alert('Please select both a from and to date.');
      return;
    }
    const reportUrl = `${backendUrl}/farmers/${user.id}/transactions/report?from_date=${fromDate}&to_date=${toDate}`;
    window.open(reportUrl, '_blank');
  };

  if (loading) {
    return <div className="text-center p-4">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Transactions</h2>
      <div className="flex items-center mb-4 space-x-4">
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleGenerateReport}
          className="self-end bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
        >
          <FaFilePdf className="mr-2" />
          Generate Report
        </button>
      </div>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Transaction ID</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Quantity Sold</th>
                <th className="py-2 px-4 border-b">Payment Amount</th>
                <th className="py-2 px-4 border-b">Sold Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.transaction_id}>
                  <td className="py-2 px-4 border-b text-center">{tx.transaction_id}</td>
                  <td className="py-2 px-4 border-b text-center">{tx.product_name}</td>
                  <td className="py-2 px-4 border-b text-center">{tx.category}</td>
                  <td className="py-2 px-4 border-b text-center">{tx.quantity_sold}</td>
                  <td className="py-2 px-4 border-b text-center">₹{tx.payment_amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(tx.sold_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmerTransactions;