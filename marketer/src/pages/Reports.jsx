import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="bg-green-700 text-white py-5 px-8 rounded-2xl mb-8 flex justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn bg-green-600 text-white hover:bg-green-700 w-full md:w-48 font-semibold"
        >
          Back
        </button>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Sales This Month</h2>
          <div className="h-64 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center text-4xl text-gray-700">
            2,450,678 ETB
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Top Products</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Local Rice</span>
              <span className="font-bold">1,200,000 ETB</span>
            </div>
            <div className="flex justify-between">
              <span>Wheat</span>
              <span className="font-bold">78,000 ETB</span>
            </div>
            <div className="flex justify-between">
              <span>Tomatoes</span>
              <span className="font-bold">45,000 ETB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
