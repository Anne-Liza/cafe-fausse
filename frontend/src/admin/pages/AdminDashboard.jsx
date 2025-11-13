import { useEffect, useState } from "react";
import { getPublicMenu, listAdmins, getPromo } from "../../services/adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ menu: 0, admins: 0, promo: "" });

  useEffect(() => {
    (async () => {
      const [menu, admins, promo] = await Promise.all([
        getPublicMenu(), listAdmins(), getPromo()
      ]);
      setStats({ menu: menu.length, admins: admins.length, promo: promo.headline });
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back 👋</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-white shadow p-6">
          <div className="text-sm opacity-70">Menu Items</div>
          <div className="text-3xl font-bold">{stats.menu}</div>
        </div>
        <div className="card bg-white shadow p-6">
          <div className="text-sm opacity-70">Admins</div>
          <div className="text-3xl font-bold">{stats.admins}</div>
        </div>
        <div className="card bg-white shadow p-6">
          <div className="text-sm opacity-70">Current Promo</div>
          <div className="text-lg font-semibold">{stats.promo}</div>
        </div>
      </div>
    </div>
  );
}
