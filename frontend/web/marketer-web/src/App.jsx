import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/agent/ProductList';
import AddProduct from './pages/agent/AddProduct';
import EditProduct from './pages/agent/EditProduct';
import UserList from './pages/admin/UserList';
import TransactionList from './pages/admin/TransactionList';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedIn } from './utils/auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            isLoggedIn() ? (
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />

                  {/* Agent Routes */}
                  <Route
                    path="/agent/products"
                    element={<ProtectedRoute allowedRoles={['AGENT']}><ProductList /></ProtectedRoute>}
                  />
                  <Route
                    path="/agent/add-product"
                    element={<ProtectedRoute allowedRoles={['AGENT']}><AddProduct /></ProtectedRoute>}
                  />
                  <Route
                    path="/agent/edit-product/:id"
                    element={<ProtectedRoute allowedRoles={['AGENT']}><EditProduct /></ProtectedRoute>}
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/users"
                    element={<ProtectedRoute allowedRoles={['ADMIN']}><UserList /></ProtectedRoute>}
                  />
                  <Route
                    path="/admin/transactions"
                    element={<ProtectedRoute allowedRoles={['ADMIN']}><TransactionList /></ProtectedRoute>}
                  />

                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;