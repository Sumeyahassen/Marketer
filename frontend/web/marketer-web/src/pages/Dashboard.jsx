import { getCurrentUser } from '../utils/auth';

const Dashboard = () => {
  const user = getCurrentUser();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}!</h1>
      <p className="text-xl">Role: <span className="font-semibold">{user?.role}</span></p>
      <div className="mt-8 p-6 bg-white rounded shadow">
        <p>Use the sidebar to navigate:</p>
        <ul className="list-disc ml-8 mt-4">
          {user?.role === 'AGENT' && (
            <>
              <li>View and manage your products</li>
              <li>Add new products</li>
            </>
          )}
          {user?.role === 'ADMIN' && (
            <>
              <li>View all users</li>
              <li>View all transactions</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;