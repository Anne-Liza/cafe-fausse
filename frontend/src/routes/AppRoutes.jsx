import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Reservations from "../pages/Reservations";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import DishDetails from "../pages/DishDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import OrderSuccess from "../pages/OrderSuccess";

// 🔹 Admin imports
import ProtectedRoute from "../admin/components/ProtectedRoute";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import MenuManager from "../admin/pages/MenuManager";
import StaffManager from "../admin/pages/StaffManager";
import MarketingManager from "../admin/pages/MarketingManager";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/menu/:id" element={<DishDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* === Admin routes (nested) === */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route
          path="menu"
          element={
            <ProtectedRoute allow={["SuperAdmin", "Chef"]}>
              <MenuManager />
            </ProtectedRoute>
          }
          />
        <Route
          path="staff"
          element={
            <ProtectedRoute allow={["SuperAdmin"]}>
              <StaffManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="marketing"
          element={
            <ProtectedRoute allow={["SuperAdmin", "Marketing"]}>
              <MarketingManager />
            </ProtectedRoute>
          }
        />
      </Route>

    </Routes>


  );
}
