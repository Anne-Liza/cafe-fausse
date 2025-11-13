import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Menu() {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch from backend
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/menu");
      const items = res.data;

      // Group menu by category
      const grouped = items.reduce((acc, item) => {
        const cat = item.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {});

      setMenuData(grouped);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading menu...
      </div>
    );
  }

  return (
    <div className="bg-[#fffaf7] text-gray-800">
      {/* === Header === */}
      <section className="text-center py-20 bg-base-100">
        <h1 className="text-5xl font-bold mb-4 text-[#a44b23]">Our Menu</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated selection of dishes — where artistry meets flavor,
          and every meal is a story.
        </p>
      </section>

      {/* === Dynamic Menu Sections === */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {Object.keys(menuData).map((category) => (
          <div key={category}>
            <h2 className="text-3xl font-bold mb-10 text-center text-[#a44b23]">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {menuData[category].map((item) => (
                <div
                  key={item.id}
                  className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <figure>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                    />
                  </figure>
                  <div className="card-body text-left">
                    <h3 className="card-title text-2xl mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        ${item.price}
                      </span>
                      <Link
                        to={`/menu/${item.id}`}
                        className={`btn btn-sm ${
                          item.available
                            ? "bg-[#a44b23] text-white hover:bg-[#8a3d1c]"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                      >
                        {item.available ? "Order" : "Unavailable"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* === QR & PDF Section === */}
      <section className="py-12 bg-[#fffaf7]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* QR Code */}
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold mb-3 text-[#a44b23]">
              Scan to View Menu
            </h2>
            <p className="text-gray-600 mb-4">
              Scan this QR code to open the full menu on your device.
            </p>
            <div className="inline-block bg-white p-4 rounded-xl shadow-md">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?data=http://127.0.0.1:5000/api/menu/pdf&size=200x200"
                alt="QR code for Café Fausse Menu"
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>

          {/* Download PDF */}
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold mb-3 text-[#a44b23]">
              Download Menu (PDF)
            </h2>
            <p className="text-gray-600 mb-4">
              Prefer a printable version? Download our complete menu as a PDF.
            </p>
            <a
              href="http://127.0.0.1:5000/api/menu/pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] px-8"
            >
              Download Menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
