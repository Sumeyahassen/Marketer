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
      return alert("Please fill all requirement");
    }
    toast.success("Product added to your stock!");
    navigate("/stock");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-500 text-white py-5 px-8 fixed w-full">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <div className="max-w-2xl mx-auto p-8 pt-32">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-8">
            <label className="block text-lg font-bold mb-3 text-black"></label>
            <div className="max-w-md mx-auto">
              <label
                className=" w-full cursor-pointer border-4 border-dashed border-gray-300 rounded-2xl
  h-64 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      console.log("Selected file:", e.target.files[0]);
                    }
                  }}
                />
                <span className="text-gray-400 text-lg">Click to upload</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg text-black font-bold mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full text-lg bg-lime-200 text-black"
                placeholder="e.g., Basmati Rice 1121"
              />
            </div>
            <div className="">
              <label className="block text-lg font-bold mb-2 text-black">
                Quantity (kg)
              </label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="input input-bordered w-full text-lg bg-lime-200 text-black"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-black">
                Buy Price (per kg)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="input input-bordered w-full text-lg bg-lime-200 text-black"
                placeholder="48"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-black">
                Your Selling Price (per kg)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="input input-bordered w-full text-lg bg-lime-200 text-black"
                placeholder="58"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={saveProduct}
              className="flex-1 btn bg-green-400 btn-lg text-xl text-black"
            >
              Save Product
            </button>
            <button
              onClick={() => navigate("/stock")}
              className="flex-1 btn bg-gray-700 btn-lg text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
