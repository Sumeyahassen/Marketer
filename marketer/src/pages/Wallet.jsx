import { Wallet, ArrowDown, ArrowUp, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WalletPage() {
  const navigate = useNavigate();
  const balance = 45678;

  const transactions = [
    {
      id: 1,
      type: "credit",
      desc: "Payment from Sharma Retail",
      amount: 29000,
      date: "Today",
    },
    {
      id: 2,
      type: "debit",
      desc: "Withdraw to bank",
      amount: -15000,
      date: "Yesterday",
    },
    {
      id: 3,
      type: "credit",
      desc: "Payment from Gupta Stores",
      amount: 9600,
      date: "2 days ago",
    },
    {
      id: 4,
      type: "credit",
      desc: "Order ORD12347",
      amount: 28000,
      date: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white py-8 px-8">
        <h1 className="text-3xl font-bold text-center">Wallet & Payments</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl shadow-2xl p-10 text-center">
          <Wallet size={60} className="mx-auto mb-4" />
          <p className="text-2xl">Current Balance</p>
          <p className="text-6xl font-bold mt-2">₹{balance.toLocaleString()}</p>
          <div className="flex gap-4 mt-8 justify-center">
            <button className="btn btn-white btn-lg text-green-700">
              Add Money
            </button>
            <button className="btn btn-outline btn-white btn-lg">
              Withdraw
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-xl mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      t.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {t.type === "credit" ? (
                      <ArrowDown className="text-green-600" />
                    ) : (
                      <ArrowUp className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold">{t.desc}</p>
                    <p className="text-sm text-gray-500">{t.date}</p>
                  </div>
                </div>
                <p
                  className={`text-2xl font-bold ${
                    t.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "credit" ? "+" : "-"}₹
                  {Math.abs(t.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
