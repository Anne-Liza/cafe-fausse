import { NavLink } from "react-router-dom";

const linkCls = ({ isActive }) =>
  `block px-4 py-3 rounded-lg transition ${
    isActive ? "bg-[#a44b23] text-white" : "hover:bg-base-300"
  }`;

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-base-100 border-r">
      <div className="p-6 text-2xl font-extrabold">Café Fausse</div>
      <nav className="space-y-2 px-3">
        <NavLink className={linkCls} to="/admin">Dashboard</NavLink>
        <NavLink className={linkCls} to="/admin/menu">Menu Manager</NavLink>
        <NavLink className={linkCls} to="/admin/staff">Staff Manager</NavLink>
        <NavLink className={linkCls} to="/admin/marketing">Marketing</NavLink>
      </nav>
    </aside>
  );
}
