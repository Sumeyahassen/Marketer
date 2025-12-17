import { getCurrentUser } from '../utils/auth';

const Dashboard = () => {
  const user = getCurrentUser();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome back, <span className="text-indigo-600">{user?.email.split('@')[0]}</span>!
        </h1>
        <p className="text-xl text-gray-600">
          Role: <span className="font-bold text-indigo-600 capitalize">{user?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <p className="mt-2">Use the sidebar to manage your section</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold">System Status</h3>
          <p className="mt-2">Everything is running smoothly</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold">Security</h3>
          <p className="mt-2">Your session is protected</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;