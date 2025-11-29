export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-green-700 text-white py-5 px-8 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Sales This Month</h2>
          <div className="h-64 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-4xl text-gray-500">
            ₹2,45,678
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Top Products</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Basmati Rice</span>
              <span className="font-bold">₹1,20,000</span>
            </div>
            <div className="flex justify-between">
              <span>Wheat</span>
              <span className="font-bold">₹78,000</span>
            </div>
            <div className="flex justify-between">
              <span>Tomatoes</span>
              <span className="font-bold">₹45,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
