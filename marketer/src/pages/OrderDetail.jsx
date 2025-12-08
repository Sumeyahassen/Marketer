import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Truck,
  PackageCheck,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

export default function OrderDetail() {
  const { id } = useParams(); // e.g., /order/ORD12345
  const navigate = useNavigate();
  const [status, setStatus] = useState("Packed"); // will come from API later

  // Fake order data
  const order = {
    id: id || "ORD12345",
    customer: "Mulualem Retail Store",
    phone: "+251 912345678",
    address: "Burayu Main Market, Near New brige, Burayu, Sheger ",
    items: [
      {
        name: "Local Rice 1121",
        qty: 500,
        unit: "kg",
        price: 58,
        total: 29000,
      },
      { name: "Fresh Tomatoes", qty: 100, unit: "kg", price: 48, total: 4800 },
    ],
    subtotal: 33800,
    deliveryCharge: 400,
    total: 34200,
    orderDate: "28 Nov 2025, 10:30 AM",
    status: status,
  };

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    toast.success(`Order ${order.id} is now ${newStatus}!`);
  };

  const statusSteps = [
    { label: "Pending", value: "Pending", icon: Clock },
    { label: "Packed", value: "Packed", icon: PackageCheck },
    { label: "Out for Delivery", value: "Out for Delivery", icon: Truck },
    { label: "Delivered", value: "Delivered", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-5 px-8 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg"
          >
            <span className="text-xl font-bold">Order {order.id}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Order Items + Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-2xl text-black shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Order Items</h2>
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-4 border-b last:border-0"
              >
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-gray-600">
                    {item.qty} {item.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-700">
                    {item.total.toLocaleString()}ETB
                  </p>
                  <p className="text-sm text-gray-500">{item.price}/kg </p>
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t-2 border-dashed">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>{order.subtotal.toLocaleString()}ETB</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Delivery Charge</span>
                <span>{order.deliveryCharge}ETB</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-green-700 mt-4">
                <span>Total Amount</span>
                <span>{order.total.toLocaleString()}ETB</span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl text-black font-bold mb-6">
              Update Order Status
            </h2>
            <div className="flex flex-col gap-4">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive =
                  statusSteps.findIndex((s) => s.value === status) >= index;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isActive ? "bg-green-600 text-white" : "bg-gray-300"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-bold ${
                          isActive ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {isActive &&
                      status !== "Delivered" &&
                      step.value !== status && (
                        <button
                          onClick={() => updateStatus(step.value)}
                          className="btn bg-green-700 btn-md text-white"
                        >
                          Mark as {step.label}
                        </button>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Customer & Delivery Info */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-2xl text-black shadow-xl p-8">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
              <User size={28} /> Customer Details
            </h3>
            <p className="text-lg font-bold">{order.customer}</p>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <Phone size={18} /> {order.phone}
            </p>
            <p className="text-gray-700 flex items-start gap-2 mt-4">
              <MapPin size={18} className="mt-1" />
              <span>{order.address}</span>
            </p>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 btn bg-blue-600  text-white flex items-center justify-center gap-2">
                <Phone size={18} /> Call
              </button>
              <button className="flex-1 btn btn-outline text-white bg-green-600">
                WhatsApp
              </button>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white text-black rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-4">Order Info</h3>
            <p className="">Order placed</p>
            <p className="font-bold">{order.orderDate}</p>
            <p className=" mt-4">Payment</p>
            <p className="font-bold text-green-600">Paid (UPI)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
