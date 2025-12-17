import { NavLink } from 'react-router-dom';
import { getRole } from '../../utils/auth';
import {
  HomeIcon,
  CubeIcon,
  PlusCircleIcon,
  UsersIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const role = getRole();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  ];

  if (role === 'AGENT') {
    navItems.push(
      { to: '/agent/products', label: 'My Products', icon: CubeIcon },
      { to: '/agent/add-product', label: 'Add Product', icon: PlusCircleIcon }
    );
  }

  if (role === 'ADMIN') {
    navItems.push(
      { to: '/admin/users', label: 'All Users', icon: UsersIcon },
      { to: '/admin/transactions', label: 'Transactions', icon: ShoppingCartIcon }
    );
  }

  return (
    <aside className="bg-gradient-to-b from-indigo-800 to-indigo-900 text-white w-64 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-center mb-10">Marketer Pro</h2>
      </div>
      <nav className="px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? 'bg-white text-indigo-800 shadow-md'
                  : 'hover:bg-indigo-700'
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;