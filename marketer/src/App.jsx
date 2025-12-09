import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import BuyFromAgents from "./pages/BuyFromAgents";
import ProductDetail from "./pages/AgentProductDetail";
import Cart from "./pages/Cart";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import WalletPage from "./pages/Wallet";
import AddEditStock from "./pages/AddProductModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<BuyFromAgents />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/stock" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/add" element={<AddEditStock/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
