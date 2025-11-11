// src/pages/Gallery.jsx
import React from "react";

export default function Gallery() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1600891964734-05b3be46d7b6?auto=format&fit=crop&w=1000&q=80",
      alt: "Fine dining table setting",
      category: "interior",
    },
    {
      src: "https://images.unsplash.com/photo-1612197527762-9c6e8898c58a?auto=format&fit=crop&w=1000&q=80",
      alt: "Wine and candlelight",
      category: "ambience",
    },
    {
      src: "https://images.unsplash.com/photo-1578655410512-58e79a231f9b?auto=format&fit=crop&w=1000&q=80",
      alt: "Plated gourmet dish",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1564758866811-8b98a5f9f0c1?auto=format&fit=crop&w=1000&q=80",
      alt: "Chef in kitchen",
      category: "team",
    },
    {
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
      alt: "Guests dining",
      category: "people",
    },
    {
      src: "https://images.unsplash.com/photo-1617196034796-73e4e43d4a46?auto=format&fit=crop&w=1000&q=80",
      alt: "Pan-seared salmon dish",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1598514983191-3d0d2cf0d79c?auto=format&fit=crop&w=1000&q=80",
      alt: "Dining area with art",
      category: "interior",
    },
    {
      src: "https://images.unsplash.com/photo-1606220945770-b5b6c2f1b79c?auto=format&fit=crop&w=1000&q=80",
      alt: "Evening lights in the restaurant",
      category: "ambience",
    },
  ];

  return (
    <div className="bg-[#fffaf7] text-gray-800">
      {/* === HERO === */}
      <section
        className="relative h-[50vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606220945770-b5b6c2f1b79c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
            Gallery
          </h1>
          <p className="text-lg text-gray-200">
            Discover the moments, artistry, and atmosphere of Café Fausse.
          </p>
        </div>
      </section>

      {/* === GALLERY GRID === */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold capitalize">
                  {img.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CALL TO ACTION === */}
      <section className="text-center py-20 bg-[#a44b23] text-white">
        <h2 className="text-3xl font-bold mb-4">
          Every Image Tells a Story
        </h2>
        <p className="text-gray-200 mb-8 max-w-xl mx-auto">
          From our kitchen’s creativity to your table’s laughter — experience Café Fausse in every frame.
        </p>
        <a
          href="/reservations"
          className="btn bg-white text-[#a44b23] hover:bg-gray-100 px-8"
        >
          Reserve Your Experience
        </a>
      </section>
    </div>
  );
}
