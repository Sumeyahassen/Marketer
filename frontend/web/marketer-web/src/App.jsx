import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/agent/ProductList';
import AddProduct from './pages/agent/AddProduct';
import UserList from './pages/admin/UserList';
import TransactionList from './pages/admin/TransactionList';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedIn, getRole } from './utils/auth';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route - Login */}
        <Route
          path="/login"
          element={
            isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* Protected Routes - All inside Layout */}
        <Route
          path="/*"
          element={
            isLoggedIn() ? (
              <Layout>
                <Routes>
                  {/* Default Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Agent Routes */}
                  <Route
                    path="/agent/products"
                    element={
                      <ProtectedRoute allowedRoles={['AGENT']}>
                        <ProductList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/agent/add-product"
                    element={
                      <ProtectedRoute allowedRoles={['AGENT']}>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute allowedRoles={['ADMIN']}>
                        <UserList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/transactions"
                    element={
                      <ProtectedRoute allowedRoles={['ADMIN']}>
                        <TransactionList />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect root to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />

                  {/* Catch all unknown routes */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;