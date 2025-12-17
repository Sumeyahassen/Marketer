import { useState, useEffect } from 'react';
import api from '../../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // Note: We don't have this endpoint yet in backend. You can create a simple one later.
      // For now, we'll assume you add GET /admin/transactions that returns all transactions
      const res = await api.get('/admin/transactions');
      setTransactions(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load transactions (endpoint may not exist yet)');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-xl">Loading transactions...</p>;
  if (error) return <p className="text-red-600 text-xl">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Transactions</h1>

      {transactions.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Buyer</th>
                <th className="py-3 px-6 text-left">Seller</th>
                <th className="py-3 px-6 text-left">Product ID</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{tx.id}</td>
                  <td className="py-3 px-6">{tx.buyer?.email || tx.buyerId}</td>
                  <td className="py-3 px-6">{tx.seller?.email || tx.sellerId}</td>
                  <td className="py-3 px-6">{tx.productId}</td>
                  <td className="py-3 px-6">{tx.quantity}</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tx.status === 'COMPLETED' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;