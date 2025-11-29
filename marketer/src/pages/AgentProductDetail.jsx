import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  MapPin,
  Star,
  ShoppingCart,
  ChevronLeft,
  Check,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(50);
  const [cartCount, setCartCount] = useState(0);

  // Fake product data (in real app this comes from URL params or API)
  const product = {
    name: "Premium Basmati Rice 1121",
    price: 48,
    unit: "kg",
    available: 800,
    agent: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
    reviews: 127,
    distance: "42 km",
    location: "Amritsar, Punjab",
    organic: true,
    description:
      "Premium quality long-grain Basmati rice directly from Punjab farms. Aged for 12 months for perfect aroma and taste. 100% pure and chemical-free.",
    images: ["", "", "", ""], // 4 placeholder images
  };

  const addToCart = () => {
    setCartCount((prev) => prev + quantity);
    toast.success(`${quantity} ${product.unit} ${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 hover:bg-green-600 px-4 py-2 rounded-lg transition"
          >
            <ChevronLeft size={28} />
            <span className="text-xl font-bold">Product Detail</span>
          </button>
          <div className="relative">
            <ShoppingCart size={32} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left – Images */}
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-2xl h-96 mb-4"></div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 border-2 border-dashed rounded-xl h-24"
                ></div>
              ))}
            </div>
          </div>

          {/* Right – Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {product.organic && (
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  100% Organic
                </span>
              )}
              <h1 className="text-4xl font-bold mt-4">{product.name}</h1>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  <Star className="text-yellow-500 fill-current" size={24} />
                  <span className="text-2xl font-bold ml-1">
                    {product.rating}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="text-green-600 flex items-center gap-2">
                  <Check size={28} /> Verified Agent
                </div>
              </div>

              <div className="mt-6 p-6 bg-green-50 rounded-2xl">
                <p className="text-5xl font-bold text-green-700">
                  ₹{product.price}
                  <span className="text-2xl text-gray-600">
                    {" "}
                    / {product.unit}
                  </span>
                </p>
                <p className="text-green-600 mt-2">
                  Available: {product.available} {product.unit}
                </p>
              </div>

              <p className="text-gray-700 mt-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mt-8">
                <label className="text-lg font-bold">
                  Quantity ({product.unit})
                </label>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => setQuantity(Math.max(10, quantity - 10))}
                    className="btn btn-circle btn-lg btn-outline"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="input input-bordered w-32 text-center text-2xl font-bold"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 10)}
                    className="btn btn-circle btn-lg btn-outline"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-2xl font-bold mt-4">
                Total: ₹{product.price * quantity}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button className="flex-1 btn btn-success btn-lg text-white text-xl flex items-center justify-center gap-3">
                  <Phone size={28} /> Call Agent
                </button>
                <button
                  onClick={addToCart}
                  className="flex-1 btn btn-orange btn-lg text-white text-xl flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={28} /> Add to Cart
                </button>
              </div>

              {/* Agent Info */}
              <div className="mt-10 p-6 bg-gray-50 rounded-2xl flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div>
                  <h3 className="text-xl font-bold">{product.agent}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} /> {product.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck size={18} /> Delivery in 2–3 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
