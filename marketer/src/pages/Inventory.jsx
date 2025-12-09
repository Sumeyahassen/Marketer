import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Edit2, Plus, Search } from "lucide-react";
import { inventory as initialInventory } from "../data/Inventory.js"; // import the inventory


export default function Inventory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState(initialInventory); // initialize state with imported data

  const totalStockValue = inventory.reduce(
    (sum, item) => sum + item.remaining * item.buyPrice,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-green-400 text-white py-5 px-4 shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            My Stock (Inventory)
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/add")}
              className="btn bg-green-500 px-4 py-2 flex items-center justify-center gap-2 text-white hover:bg-green-600"
            >
              <Plus size={20} /> Add New Product
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn bg-lime-400 text-white hover:bg-lime-500 px-4 py-2 font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className=" max-w-7xl mx-auto p-6 pt-32 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Stock Value</p>
                <p className="text-4xl font-bold text-green-700">
                  {totalStockValue.toLocaleString()}ETB
                </p>
              </div>
              <Package className="text-green-600" size={48} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Total Products</p>
            <p className="text-4xl font-bold text-gray-600">
              {inventory.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Low Stock Items</p>
            <p className="text-4xl font-bold text-red-600">
              {inventory.filter((i) => i.remaining < 100).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mb-6">
          <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search in your stock..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-12 text-lg bg-lime-100 text-black"
          />
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-lime-100 text-black text-lg">
                <tr>
                  <th>Product</th>
                  <th>Bought</th>
                  <th>Sold</th>
                  <th>Remaining</th>
                  <th>Buy Price</th>
                  <th>Sell Price</th>
                  <th>Profit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 bg-gray-100 text-lg"
                    >
                      <td className="font-bold text-black">{item.name}</td>
                      <td className="text-gray-700">
                        {item.boughtQty} {item.unit}
                      </td>
                      <td className="text-gray-700">
                        {item.soldQty} {item.unit}
                      </td>
                      <td
                        className={
                          item.remaining < 100
                            ? "text-red-600 font-bold"
                            : "text-green-600 font-bold"
                        }
                      >
                        {item.remaining} {item.unit}
                      </td>
                      <td className="text-gray-700">{item.buyPrice}ETB</td>
                      <td className="font-bold text-green-700">
                        {item.sellPrice}ETB
                      </td>
                      <td className="text-gray-700 font-bold">
                        {item.profit}ETB (+
                        {Math.round((item.profit / item.buyPrice) * 100)}%)
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-circle text-blue-600 hover:bg-blue-50">
                          <Edit2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
