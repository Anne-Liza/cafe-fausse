// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="bg-[#fffaf7] text-gray-800">
      {/* === HERO SECTION === */}
      <section
        className="relative h-[60vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606220945770-b5b6c2f1b79c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
            The Story of Café Fausse
          </h1>
          <p className="text-lg text-gray-200">
            A celebration of culinary artistry, cultural roots, and creative
            connection.
          </p>
        </div>
      </section>

      {/* === ORIGIN STORY === */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1559333086-4e94bd09e8b9?auto=format&fit=crop&w=1000&q=80"
            alt="Café interior"
            className="rounded-xl shadow-lg object-cover w-full h-[420px]"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[#a44b23] mb-4">
            Rooted in Heritage, Refined in Taste
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2023, Café Fausse began as a cozy retreat for dreamers
            and doers — artists, travelers, and thinkers searching for a moment
            of stillness in the heart of the city.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Inspired by African flavors and global techniques, we’ve built a
            dining experience that’s elegant yet unpretentious, modern yet
            timeless — a reflection of our continent’s rhythm and resilience.
          </p>
        </div>
      </section>

      {/* === OUR PHILOSOPHY === */}
      <section className="bg-[#a44b23] text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Our Philosophy</h2>
          <p className="text-lg leading-relaxed opacity-90">
            At Café Fausse, food is more than nourishment — it’s an act of
            storytelling. Every dish is a conversation between local farmers,
            global traditions, and your palate. We believe in sustainability,
            slow dining, and celebrating the small rituals that bring people
            together.
          </p>
        </div>
      </section>

      {/* === MEET THE CHEF === */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-[#a44b23] mb-4">
            Meet the Chef
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chef Amara Njoroge leads our kitchen with a passion for innovation
            and integrity. Trained in both Nairobi and Lyon, her style blends
            classical French technique with the bold, earthy soul of African
            cuisine.
          </p>
          <p className="text-gray-700 leading-relaxed">
            “Food should tell a story,” she says, “not just of where we are, but
            of where we come from — and who we might become.”
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
            alt="Chef portrait"
            className="rounded-xl shadow-lg object-cover w-full h-[420px]"
          />
        </div>
      </section>

      {/* === VISION + VALUES === */}
      <section className="bg-[#f8ebe4] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#a44b23] mb-8">
            Our Vision & Values
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We source fresh, seasonal ingredients from local farmers who
                share our commitment to ethical food systems.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Creativity</h3>
              <p className="text-gray-600">
                From plate presentation to playlist, every element is crafted to
                inspire your senses and spark conversation.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-gray-600">
                We believe food has the power to build bridges — between people,
                cultures, and generations.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* === TEAM & AMBIENCE === */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#a44b23] mb-4">
            The Faces & Spaces of Café Fausse
          </h2>
          <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
            Behind every plate and every smile is a passionate team that brings
            warmth, creativity, and heart into your dining experience.
            Our restaurant space celebrates Afro-modern artistry — earthy tones,
            handcrafted details, and ambient lighting inspired by the rhythm of Nairobi nights.
          </p>
                {/* === AMBIENCE CAROUSEL === */}
      <section className="bg-[#fffaf7] py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#a44b23] mb-6">
            The Ambience of Café Fausse
          </h2>
          <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
            Step inside our world — where warm light, soft jazz, and subtle
            aromas blend into an atmosphere of relaxed sophistication.
          </p>

          {/* DaisyUI carousel */}
          <div className="carousel rounded-2xl shadow-xl w-full md:w-[900px] mx-auto">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="https://images.unsplash.com/photo-1559333086-4e94bd09e8b9?auto=format&fit=crop&w=1600&q=80"
                className="w-full object-cover h-[480px]"
                alt="Café interior"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle bg-[#a44b23] text-white border-none">❮</a>
                <a href="#slide2" className="btn btn-circle bg-[#a44b23] text-white border-none">❯</a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://images.unsplash.com/photo-1606220945770-b5b6c2f1b79c?auto=format&fit=crop&w=1600&q=80"
                className="w-full object-cover h-[480px]"
                alt="Evening dining setup"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle bg-[#a44b23] text-white border-none">❮</a>
                <a href="#slide3" className="btn btn-circle bg-[#a44b23] text-white border-none">❯</a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://images.unsplash.com/photo-1598514983191-3d0d2cf0d79c?auto=format&fit=crop&w=1600&q=80"
                className="w-full object-cover h-[480px]"
                alt="Romantic dinner table"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle bg-[#a44b23] text-white border-none">❮</a>
                <a href="#slide4" className="btn btn-circle bg-[#a44b23] text-white border-none">❯</a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="https://images.unsplash.com/photo-1612197527762-9c6e8898c58a?auto=format&fit=crop&w=1600&q=80"
                className="w-full object-cover h-[480px]"
                alt="Wine and candles"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle bg-[#a44b23] text-white border-none">❮</a>
                <a href="#slide1" className="btn btn-circle bg-[#a44b23] text-white border-none">❯</a>
              </div>
            </div>
          </div>
        </div>
      </section>


          {/* === Photo Grid === */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80"
                alt="Chef plating dish"
                className="object-cover w-full h-[360px] hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#a44b23]">
                  Chef Amara Njoroge
                </h3>
                <p className="text-sm text-gray-600">Head Chef · Culinary Visionary</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1578686713403-9d8e96de1b7b?auto=format&fit=crop&w=1000&q=80"
                alt="Restaurant interior"
                className="object-cover w-full h-[360px] hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#a44b23]">
                  The Main Dining Room
                </h3>
                <p className="text-sm text-gray-600">
                  Elegant interiors with handcrafted décor & subtle lighting
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80"
                alt="Service staff"
                className="object-cover w-full h-[360px] hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#a44b23]">
                  The Fausse Team
                </h3>
                <p className="text-sm text-gray-600">
                  Our dedicated hosts & servers — the heartbeat of the experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* === FINAL CTA === */}
      <section className="text-center py-20 bg-white">
        <h2 className="text-3xl font-bold text-[#a44b23] mb-4">
          Join Our Table
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Whether for an intimate dinner, a celebration, or a quiet coffee
          moment — Café Fausse is where stories are shared and memories are
          made.
        </p>
        <a
          href="/reservations"
          className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] px-8"
        >
          Reserve Your Experience
        </a>
      </section>
    </div>
  );
}
