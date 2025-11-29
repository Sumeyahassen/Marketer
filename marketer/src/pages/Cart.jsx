import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Truck, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Basmati Rice 1121",
      agent: "Rajesh Kumar",
      price: 48,
      qty: 200,
      unit: "kg",
      image: "",
    },
    {
      id: 2,
      name: "Fresh Tomatoes",
      agent: "Sunita Devi",
      price: 35,
      qty: 50,
      unit: "kg",
      image: "",
    },
  ]);

  const updateQty = (id, newQty) => {
    if (newQty < 10) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryCharges = 350;
  const total = subtotal + deliveryCharges;

  const placeOrder = () => {
    toast.success("Order placed successfully! Agent will contact you soon.");
    navigate("/dashboard");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={100} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-600">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate("/buy")}
            className="btn btn-success btn-lg mt-8"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-5 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            My Cart ({cartItems.length} items)
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost text-white"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex gap-6"
            >
              <div className="w-32 h-32 bg-gray-200 border-2 border-dashed rounded-xl"></div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <p className="text-gray-600">From: {item.agent}</p>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 10)}
                    className="btn btn-circle btn-outline"
                  >
                    <Minus size={20} />
                  </button>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="input input-bordered w-32 text-center text-xl font-bold"
                  />
                  <button
                    onClick={() => updateQty(item.id, item.qty + 10)}
                    className="btn btn-circle btn-outline"
                  >
                    <Plus size={20} />
                  </button>
                  <span className="text-lg text-gray-600">{item.unit}</span>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-3xl font-bold text-green-700">
                    ₹{item.price * item.qty}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="btn btn-ghost text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="border-t-2 border-dashed pt-4">
                <div className="flex justify-between text-2xl font-bold text-green-700">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-xl flex items-center gap-3">
              <Truck className="text-green-700" size={32} />
              <div>
                <p className="font-bold">
                  Free delivery on orders above ₹50,000
                </p>
                <p className="text-sm text-gray-600">
                  You’re just ₹{50000 - subtotal > 0 ? 50000 - subtotal : 0}{" "}
                  away!
                </p>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="btn btn-success btn-lg w-full mt-8 text-white text-xl"
            >
              Place Order – ₹{total}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Agent will call you within 30 minutes to confirm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
