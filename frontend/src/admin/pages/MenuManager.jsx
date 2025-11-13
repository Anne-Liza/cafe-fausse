import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function MenuManager() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    available: true,
  });
  const [editingItem, setEditingItem] = useState(null);

  const API_BASE = "http://127.0.0.1:5000/api/admin/menu";

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/menu/");
      setMenu(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu items");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Add or Update menu item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_BASE}/update/${editingItem.id}`, form);
        toast.success("Item updated successfully");
      } else {
        await axios.post(`${API_BASE}/add`, form);
        toast.success("Item added successfully");
      }
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image_url: "",
        available: true,
      });
      setEditingItem(null);
      fetchMenu();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save item");
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setEditingItem(item);
    setForm(item);
  };

  // Delete item
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_BASE}/delete/${id}`);
        toast.success("Item deleted");
        fetchMenu();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete item");
      }
    }
  };

  // Toggle availability
  const handleToggle = async (id) => {
    try {
      await axios.patch(`${API_BASE}/toggle/${id}`);
      fetchMenu();
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle availability");
    }
  };

  return (
    <div className="p-6 bg-[#fffaf7] min-h-screen">
      <h1 className="text-3xl font-bold text-[#a44b23] mb-6">Menu Manager</h1>

      {/* === Form === */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-10 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Dish Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="textarea textarea-bordered w-full md:col-span-2"
        />
        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) =>
              setForm({ ...form, available: e.target.checked })
            }
          />
          Available
        </label>
        <button
          type="submit"
          className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] md:col-span-2"
        >
          {editingItem ? "Update Dish" : "Add Dish"}
        </button>
      </form>

      {/* === Menu Table === */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-white rounded-lg shadow-md">
          <thead className="bg-[#a44b23] text-white">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (KSH)</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id} className="hover">
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <span
                    className={`badge ${
                      item.available ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item.available ? "Yes" : "No"}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
