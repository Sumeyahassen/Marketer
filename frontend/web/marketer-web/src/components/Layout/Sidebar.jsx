import { NavLink } from 'react-router-dom';
import { getRole } from '../../utils/auth';

const Sidebar = () => {
  const role = getRole();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block p-3 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          Dashboard
        </NavLink>

        {role === 'AGENT' && (
          <>
            <NavLink
              to="/agent/products"
              className={({ isActive }) =>
                `block p-3 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
              }
            >
              My Products
            </NavLink>
            <NavLink
              to="/agent/add-product"
              className={({ isActive }) =>
                `block p-3 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
              }
            >
              Add Product
            </NavLink>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block p-3 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
              }
            >
              All Users
            </NavLink>
            <NavLink
              to="/admin/transactions"
              className={({ isActive }) =>
                `block p-3 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
              }
            >
              All Transactions
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;