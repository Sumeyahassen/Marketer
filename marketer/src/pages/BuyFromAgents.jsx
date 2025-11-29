import { useState } from "react";
import { Search, MapPin, Star, Phone, ShoppingCart } from "lucide-react";

export default function BuyFromAgents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Fake data – replace with API later
  const products = [
    {
      id: 1,
      name: "Basmati Rice 1121",
      price: 48,
      unit: "kg",
      qty: 800,
      agent: "Rajesh Farmer",
      rating: 4.8,
      distance: "42 km",
      organic: true,
    },
    {
      id: 2,
      name: "Fresh Tomatoes",
      price: 35,
      unit: "kg",
      qty: 250,
      agent: "Sunita Devi",
      rating: 4.9,
      distance: "18 km",
      organic: false,
    },
    {
      id: 3,
      name: "Wheat (Lokwan)",
      price: 22,
      unit: "kg",
      qty: 2000,
      agent: "Gurpreet Singh",
      rating: 4.7,
      distance: "89 km",
      organic: false,
    },
    {
      id: 4,
      name: "Organic Potatoes",
      price: 28,
      unit: "kg",
      qty: 500,
      agent: "Vikas Organic Farm",
      rating: 5.0,
      distance: "35 km",
      organic: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-5 px-8">
        <h1 className="text-3xl font-bold">Buy from Agents</h1>
        <p>Find fresh agricultural products directly from farmers</p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white shadow-md p-6 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search products, agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-12 text-lg"
            />
          </div>
          <select className="select justify-center select-bordered w-full md:w-64">
            <option className="">All Categories</option>
            <option>Rice</option>
            <option>Vegetables</option>
            <option>Grains</option>
            <option>Fruits</option>
          </select>
          <button
            onClick={() => navigator()}
            className="btn btn-success text-black"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image */}
              <div className="h-48 bg-gray-200 border-2 border-dashed rounded-t-2xl relative">
                <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Available {p.qty} {p.unit}
                </div>
                {p.organic && (
                  <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
                    Organic
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{p.distance} away</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-3xl font-bold text-green-700">
                      ₹{p.price}
                      <span className="text-lg text-gray-500">/{p.unit}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star
                        className="text-yellow-500 fill-current"
                        size={18}
                      />
                      <span className="font-bold">{p.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">{p.agent}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                  <button className="flex-1 btn btn-outline btn-success flex items-center gap-2">
                    <Phone size={18} /> Contact
                  </button>
                  <button className="flex-1 btn btn-success text-white flex items-center gap-2">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
