import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  ShoppingCart,
  Package,
  Wallet,
  TrendingUp,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Fake data – replace with real API later
  const stats = {
    stockValue: "₹12,45,890",
    todaySales: "₹45,678",
    pendingOrders: 12,
    walletBalance: "₹45,890",
  };

  const recentActivity = [
    {
      id: 1,
      text: "New order received from Sharma Retail",
      time: "2 hours ago",
      type: "order",
    },
    {
      id: 2,
      text: "Stock updated: 500 kg Wheat added",
      time: "3 hours ago",
      type: "stock",
    },
    {
      id: 3,
      text: "Payment received ₹15,000",
      time: "5 hours ago",
      type: "payment",
    },
    {
      id: 4,
      text: "Delivery completed to Gupta Stores",
      time: "1 day ago",
      type: "delivery",
    },
  ];

  // Optional: Redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-4 px-8 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl">
              🌱
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hello Ramesh Marketer 👋</h1>
              <p className="text-green-100">
                Welcome back! Here's your today's summary
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="p-3 hover:bg-green-600 rounded-lg transition">
              <Bell size={24} />
            </button>
            <img
              src="/api/placeholder/48/48"
              alt="profile"
              className="w-12 h-12 rounded-full ring-4 ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* 4 Big Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Stock Value</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.stockValue}
                </p>
                <p className="text-green-600 text-sm mt-1">
                  ↑ 8% from yesterday
                </p>
              </div>
              <Package className="text-green-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Today's Sales</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.todaySales}
                </p>
                <p className="text-green-600 text-sm mt-1">12 orders</p>
              </div>
              <TrendingUp className="text-orange-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Deliveries</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.pendingOrders}
                </p>
                <p className="text-red-600 text-sm mt-1">Needs attention</p>
              </div>
              <ShoppingCart className="text-red-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Wallet Balance</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.walletBalance}
                </p>
                <p className="text-blue-600 text-sm mt-1">Ready to withdraw</p>
              </div>
              <Wallet className="text-blue-600" size={48} />
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => navigate("/buy")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <Leaf size={36} />
            <span className="text-lg">Buy from Agents</span>
          </button>
          <button
            onClick={() => navigate("/stock")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <Package size={36} />
            <span className="text-lg">Add Stock</span>
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <ShoppingCart size={36} />
            <span className="text-lg">View Orders</span>
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <TrendingUp size={36} />
            <span className="text-lg">Reports</span>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl text-gray-600 font-bold mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === "order"
                        ? "bg-green-100 text-green-600"
                        : item.type === "stock"
                        ? "bg-blue-100 text-blue-600"
                        : item.type === "payment"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {item.type === "order" ? (
                      <ShoppingCart size={20} />
                    ) : item.type === "stock" ? (
                      <Package size={20} />
                    ) : item.type === "payment" ? (
                      <Wallet size={20} />
                    ) : (
                      <Leaf size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
