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
import Logo from "../assets/logo.png"
import TogleButton from "../components/TogleButton";

export default function Dashboard() {
  const navigate = useNavigate();

  // Fake data – replace with real API later
  const stats = {
    stockValue: "12,45,890 ETB",
    todaySales: "45,678 ETB",
    pendingOrders: 12,
    walletBalance: "45,890 ETB",
  };

  const recentActivity = [
    {
      id: 1,
      text: "New order received from  Retail",
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
      text: "Payment received 15,000 ETB",
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
    <div className="min-h-screen bg-gray-50  dark:bg-black dark:text-white">
      {/* Top Bar */}
      <div className="bg-green-500 text-white py-4 px-8 shadow-lg dark:bg-green-950">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl">
              <img src={Logo} alt="logo" className="rounded-full " />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hello Mulalem Marketer 👋</h1>
              <p className="text-green-100">
                Welcome back! Here's your today's summary
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="p-3 hover:bg-green-600 rounded-lg transition ">
              <Bell size={24} />
            </button>
           <TogleButton className="dark:text-white"/>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* 4 Big Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm  dark:text-white">Total Stock Value</p>
                <p className="text-3xl font-bold text-gray-800  dark:text-white">
                  {stats.stockValue}
                </p>
                <p className="text-green-600 text-sm mt-1  dark:text-green-200">
                  ↑ 8% from yesterday
                </p>
              </div>
              <Package className="text-green-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100  dark:bg-gray-800" >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm dark:text-white">Today's Sales</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {stats.todaySales}
                </p>
                <p className="text-green-600 text-sm mt-1 dark:text-green-200">12 orders</p>
              </div>
              <TrendingUp className="text-orange-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Deliveries</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {stats.pendingOrders}
                </p>
                <p className="text-red-600 text-sm mt-1 dark:text-red-200">Needs attention</p>
              </div>
              <ShoppingCart className="text-red-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm dark:text-white">Wallet Balance</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {stats.walletBalance}
                </p>
                <p className="text-blue-600 text-sm mt-1 dark:text-blue-200">Ready to withdraw</p>
              </div>
              <Wallet className="text-blue-600" size={48} />
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => navigate("/buy")}
            className="bg-green-300 hover:bg-green-400 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <Leaf size={36} />
            <span className="text-lg">Buy from Agents</span>
          </button>
          <button
            onClick={() => navigate("/stock")}
            className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <Package size={36} />
            <span className="text-lg">Add Stock</span>
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-emerald-200 hover:bg-emerald-300 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <ShoppingCart size={36} />
            <span className="text-lg">View Orders</span>
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-6 rounded-2xl shadow-lg flex flex-col items-center gap-2 transition"
          >
            <TrendingUp size={36} />
            <span className="text-lg">Reports</span>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-200 rounded-2xl shadow-lg p-6 dark:bg-gray-800">
          <h2 className="text-2xl text-gray-900 font-bold mb-4 dark:text-white">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-500 dark:text-white rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === "order"
                        ? "bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-900"
                        : item.type === "stock"
                        ? "bg-gray-100  dark:bg-gray-700 dark:text-white text-black"
                        : item.type === "payment"
                        ? "bg-gray-100  dark:bg-gray-700 dark:text-white text-black"
                        : "bg-gray-100  dark:bg-gray-700 dark:text-white text-black"
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
                    <p
                      className={`font-medium  dark:text-white ${
                        item.type === "order"
                          ? "text-black dark:text-white"
                          : item.type === "stock"
                          ? "text-green-600 dark:text-green-200"
                          : item.type === "payment"
                          ? "text-blue-600 dark:text-blue-200"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.text}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-white">{item.time}</p>
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
