import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-base-200 flex">
      <AdminSidebar />
      <div className="flex-1">
        <div className="navbar bg-base-100 shadow-sm px-6">
          <div className="flex-1 text-xl font-bold">Café Fausse • Admin</div>
          {/* later: user menu / logout */}
        </div>
        <main className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
