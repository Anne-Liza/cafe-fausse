import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#fffaf7] text-gray-800 font-sans">
      {/* === HERO === */}
      <section
        className="relative h-[90vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-extrabold mb-4 tracking-wide">
            CAFÉ FAUSSE
          </h1>
          <p className="text-xl mb-8">
            A contemporary fine-dining experience in the heart of the city
          </p>
          <Link to="/reservations" className="btn btn-primary text-lg px-8">
            Reserve Now
          </Link>
        </div>
      </section>

      {/* === PROMO / CTA === */}
      <section className="py-20 text-center bg-white">
        <p className="uppercase tracking-wider text-sm text-gray-500 mb-3">
          Stay Longer & Save
        </p>
        <h2 className="text-2xl mb-6">
          Receive 15% off when you dine with us three evenings or more
        </h2>
        <Link to="/reservations" className="btn bg-[#a44b23] text-white px-10">
          Book Now
        </Link>
      </section>

      {/* === IMAGE ROW === */}
      <section className="flex justify-center gap-6 px-8 py-16 bg-white">
        {[
          "https://images.unsplash.com/photo-1612197527762-9c6e8898c58a?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1600891964734-05b3be46d7b6?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1604147706283-df82e9d8e306?auto=format&fit=crop&w=900&q=80",
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-1/3 rounded-lg shadow-md object-cover"
          />
        ))}
      </section>

      {/* === FEATURE BAND === */}
      <section className="bg-[#a44b23] text-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">A Fine-Dining Destination</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <p className="text-lg leading-relaxed">
              Experience the art of culinary excellence at Café Fausse.
              Our chefs craft modern dishes inspired by global flavors,
              served in an atmosphere of understated elegance.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Exclusive tasting menus curated weekly</li>
              <li>Artisan wine & cocktail pairings</li>
              <li>Private dining rooms for intimate events</li>
              <li>Live music on weekends</li>
            </ul>
          </div>
        </div>
      </section>

      {/* === DINING SHOWCASE === */}
      <section className="bg-base-100 py-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Modern Dining at Its Best
          </h2>
          <p className="text-gray-600">
            Savour signature plates in an ambient, art-inspired setting
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1598514983191-3d0d2cf0d79c?auto=format&fit=crop&w=1470&q=80"
            alt="Dining Area"
            className="rounded-lg shadow-xl w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
