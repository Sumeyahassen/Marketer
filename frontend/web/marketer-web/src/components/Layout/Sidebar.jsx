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

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  ];

  if (role === 'AGENT') {
    links.push(
      { to: '/agent/products', label: 'My Products', icon: CubeIcon },
      { to: '/agent/add-product', label: 'Add Product', icon: PlusCircleIcon }
    );
  }

  if (role === 'ADMIN') {
    links.push(
      { to: '/admin/users', label: 'All Users', icon: UsersIcon },
      { to: '/admin/transactions', label: 'Transactions', icon: ShoppingCartIcon }
    );
  }

  return (
    <aside className="bg-gradient-to-b from-indigo-800 to-indigo-900 text-white w-64 min-h-screen">
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Marketer Pro</h2>
      </div>
      <nav className="px-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive ? 'bg-white text-indigo-800' : 'hover:bg-indigo-700'
              }`
            }
          >
            <link.icon className="h-6 w-6" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;