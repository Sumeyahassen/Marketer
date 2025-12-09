import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fake data – later from API
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      customer: "Mulualem Retail",
      items: "500 kg Rice",
      total: 29000,
      status: "Pending",
      date: "Today",
    },
    {
      id: "ORD12346",
      customer: "Kebede Stores",
      items: "200 kg Tomatoes",
      total: 9600,
      status: "Packed",
      date: "Yesterday",
    },
    {
      id: "ORD12347",
      customer: "Medrok Traders",
      items: "1000 kg Wheat",
      total: 28000,
      status: "Out for Delivery",
      date: "2 days ago",
    },
    {
      id: "ORD12348",
      customer: "Ayana Shop",
      items: "300 kg Potatoes",
      total: 12000,
      status: "Delivered",
      date: "3 days ago",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${id} updated to ${newStatus}!`);
  };

  const filteredOrders = orders
    .filter((order) =>
      order.customer.toLowerCase().includes(search.toLowerCase())
    )
    .filter((order) => filterStatus === "all" || order.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-500 text-white py-5 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sell / My Orders</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-white" size={20} />
              <input
                type="text"
                placeholder="Search by customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-green-400 border-none rounded-lg text-white placeholder-green-200"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-green-400 text-white px-4 py-2 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Packed">Packed</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn bg-lime-400 text-white hover:bg-lime-500 px-4 py-2 font-semibold"
            >
              Back
            </button>
        </div>

      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No orders found. Check back soon!
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-black">{order.id}</h3>
                    <p className="text-gray-600">{order.customer}</p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Out for Delivery"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Packed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">{order.items}</p>
                  <p className="text-xl font-bold text-green-700 mt-1">
                    {order.total.toLocaleString()}ETB
                  </p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>

                {/* Status Update Buttons */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(order.id, "Packed")}
                      className="flex-1 btn bg-yellow-600 btn-sm text-white flex items-center justify-center gap-2"
                    >
                      <PackageCheck size={16} /> Pack Now
                    </button>
                  )}
                  {order.status === "Packed" && (
                    <button
                      onClick={() => updateStatus(order.id, "Out for Delivery")}
                      className="flex-1 btn bg-blue-600 btn-sm text-white flex items-center justify-center gap-2"
                    >
                      <Truck size={16} /> Ship Now
                    </button>
                  )}
                  {order.status === "Out for Delivery" && (
                    <button
                      onClick={() => updateStatus(order.id, "Delivered")}
                      className="flex-1 btn bg-green-600 btn-sm text-white flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} /> Mark Delivered
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="flex-1 btn btn-outline btn-sm bg-green-400"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
