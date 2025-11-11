export default function Menu() {
  const menuSections = [
    {
      title: "Starters",
      color: "text-[#a44b23]",
      items: [
        {
          name: "Heirloom Tomato Salad",
          desc: "Fresh basil, burrata, balsamic reduction",
          price: "$14",
          image:
            "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Truffle Mushroom Soup",
          desc: "Wild mushrooms, cream, truffle oil drizzle",
          price: "$12",
          image:
            "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      title: "Main Courses",
      color: "text-[#a44b23]",
      items: [
        {
          name: "Pan-Seared Salmon",
          desc: "Lemon beurre blanc, seasonal vegetables",
          price: "$28",
          image:
            "https://images.unsplash.com/photo-1617196034796-73e4e43d4a46?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Filet Mignon",
          desc: "8oz tenderloin, truffle mash, red wine jus",
          price: "$38",
          image:
            "https://images.unsplash.com/photo-1617196034890-3b505d8b5b86?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      title: "Desserts",
      color: "text-[#a44b23]",
      items: [
        {
          name: "Chocolate Soufflé",
          desc: "Served warm with vanilla bean ice cream",
          price: "$10",
          image:
            "https://images.unsplash.com/photo-1619983081563-430f6360277d?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Crème Brûlée",
          desc: "Classic vanilla custard with caramelized sugar",
          price: "$9",
          image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      title: "Beverages",
      color: "text-[#a44b23]",
      items: [
        {
          name: "Classic Martini",
          desc: "Gin, dry vermouth, lemon twist or olive",
          price: "$14",
          image:
            "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Café Fausse Espresso",
          desc: "Double shot, smooth and rich",
          price: "$6",
          image:
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#fffaf7] text-gray-800">
      {/* === Header Section === */}
      <section className="text-center py-20 bg-base-100">
        <h1 className="text-5xl font-bold mb-4 text-[#a44b23]">Our Menu</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated selection of dishes — where artistry meets flavor,
          and every meal is a story.
        </p>
      </section>

      {/* === Menu Sections === */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2
              className={`text-3xl font-bold mb-10 text-center ${section.color}`}
            >
              {section.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <figure>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                  </figure>
                  <div className="card-body text-left">
                    <h3 className="card-title text-2xl mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{item.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {item.price}
                      </span>
                      <button className="btn btn-sm bg-[#a44b23] text-white hover:bg-[#8a3d1c]">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      {/* === QR & PDF Download === */}
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
