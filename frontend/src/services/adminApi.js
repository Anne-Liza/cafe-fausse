const BASE_URL = "http://127.0.0.1:5000";
const USE_MOCK = true; // set false later to hit Flask
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/** helpers */
async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

/** PUBLIC MENU (frontend uses this) */
export async function getPublicMenu() {
  if (USE_MOCK) {
    await delay(300);
    return [
      { id: 1, name: "Pan-Seared Salmon", price: 28, category: "Mains", available: true },
      { id: 2, name: "Filet Mignon", price: 38, category: "Mains", available: false },
    ];
  }
  return http("/api/menu"); // your existing public menu endpoint
}

/** ADMIN MENU */
export async function addMenuItem(payload) {
  if (USE_MOCK) {
    await delay(300);
    return { msg: "Menu item added", item: { id: Date.now(), ...payload } };
  }
  return http("/api/menu/add", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateMenuItem(id, payload) {
  if (USE_MOCK) {
    await delay(300);
    return { msg: "Item updated", item: { id, ...payload } };
  }
  return http(`/api/menu/update/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function toggleMenuItem(id) {
  if (USE_MOCK) {
    await delay(200);
    return { msg: "Item availability toggled", available: Math.random() > 0.5 };
  }
  return http(`/api/menu/toggle/${id}`, { method: "PATCH" });
}

export async function deleteMenuItem(id) {
  if (USE_MOCK) {
    await delay(200);
    return { msg: "Item deleted" };
  }
  return http(`/api/menu/delete/${id}`, { method: "DELETE" });
}

/** ADMIN STAFF */
export async function listAdmins() {
  if (USE_MOCK) {
    await delay(300);
    return [
      { id: 1, name: "Super Admin", email: "admin@cafefausse.com", role: "SuperAdmin", is_active: true },
      { id: 2, name: "Chef Andre", email: "chef@cafefausse.com", role: "Chef", is_active: true },
    ];
  }
  return http("/api/admin/list");
}

export async function createAdmin(payload) {
  if (USE_MOCK) {
    await delay(300);
    return { msg: "Admin created", admin: { id: Date.now(), ...payload } };
  }
  return http("/api/admin/create", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateAdmin(id, payload) {
  if (USE_MOCK) {
    await delay(300);
    return { msg: "Admin updated" };
  }
  return http(`/api/admin/update/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function deleteAdmin(id) {
  if (USE_MOCK) {
    await delay(200);
    return { msg: "Admin deleted" };
  }
  return http(`/api/admin/delete/${id}`, { method: "DELETE" });
}

/** MARKETING */
export async function getPromo() {
  if (USE_MOCK) {
    await delay(200);
    return { headline: "Stay Longer & Save", subtext: "Receive 15% off..." };
  }
  return http("/api/marketing/get_promo");
}

export async function updatePromo(payload) {
  if (USE_MOCK) {
    await delay(200);
    return { msg: "Promo updated", promo: payload };
  }
  return http("/api/marketing/update_promo", { method: "PUT", body: JSON.stringify(payload) });
}
