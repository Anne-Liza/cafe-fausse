import { useEffect, useState } from "react";
import { listAdmins, createAdmin, deleteAdmin } from "../../services/adminApi";

export default function StaffManager() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Chef" });

  useEffect(() => { (async () => setAdmins(await listAdmins()))(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await createAdmin(form);
    setAdmins((prev) => [...prev, res.admin]);
    setForm({ name: "", email: "", password: "", role: "Chef" });
  };

  const remove = async (id) => {
    await deleteAdmin(id);
    setAdmins((prev) => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Staff Manager</h2>

      <form onSubmit={submit} className="grid md:grid-cols-5 gap-3 bg-white p-4 rounded shadow">
        <input className="input input-bordered" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="input input-bordered" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="input input-bordered" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <select className="select select-bordered" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option>Chef</option>
          <option>Marketing</option>
          <option>SuperAdmin</option>
        </select>
        <button className="btn bg-[#a44b23] text-white">Create</button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
                <td>{a.is_active ? "Active" : "Disabled"}</td>
                <td>
                  <button onClick={()=>remove(a.id)} className="btn btn-xs btn-error text-white">Delete</button>
                </td>
              </tr>
            ))}
            {!admins.length && <tr><td colSpan="5" className="text-center py-8 text-gray-500">No admins yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
