import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddEditStock() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  const saveProduct = () => {
    if (!name || !qty || !buyPrice || !sellPrice) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Product added to your stock!");
    navigate("/stock");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white py-5 px-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-8">
            <label className="block text-lg font-bold mb-3">
              Product Photo
            </label>
            <div className="border-4 border-dashed border-gray-300 rounded-2xl h-64 flex items-center justify-center text-gray-500">
              Click to upload
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full text-lg"
                placeholder="e.g., Basmati Rice 1121"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">
                Quantity (kg)
              </label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="input input-bordered w-full text-lg"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">
                Buy Price (per kg)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="input input-bordered w-full text-lg"
                placeholder="48"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">
                Your Selling Price (per kg)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="input input-bordered w-full text-lg"
                placeholder="58"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={saveProduct}
              className="flex-1 btn btn-success btn-lg text-white text-xl"
            >
              Save Product
            </button>
            <button
              onClick={() => navigate("/stock")}
              className="flex-1 btn btn-ghost btn-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
