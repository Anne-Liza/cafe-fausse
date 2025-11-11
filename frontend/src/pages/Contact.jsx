// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-[#fffaf7] text-gray-800 min-h-screen">
      {/* === HERO === */}
      <section
        className="relative h-[50vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-200">
            We'd love to hear from you — whether it’s a question, compliment, or
            reservation inquiry.
          </p>
        </div>
      </section>

      {/* === CONTACT DETAILS + FORM === */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* Info column */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#a44b23] mb-4">
            Visit or Reach Us
          </h2>
          <p className="text-gray-700">
            1234 Culinary Ave, Suite 100 <br />
            Washington, DC 20002
          </p>
          <p className="text-gray-700">
            📞 (202) 555-4567 <br />
            ✉️ hello@cafefausse.com
          </p>
          <p className="text-gray-700">
            <strong>Hours</strong> <br />
            Mon – Sat: 5 PM – 11 PM  |  Sun: 5 PM – 9 PM
          </p>

          {/* Map embed */}
          <div className="rounded-xl overflow-hidden shadow-lg mt-8">
            <iframe
              title="Café Fausse Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0012732966866!2d-77.00476368464773!3d38.894622979571454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDUzJzQwLjYiTiA3N8KwMDAnMTYuNyJX!5e0!3m2!1sen!2sus!4v1619465849629!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Form column */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-[#a44b23] mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <button
              type="submit"
              className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] w-full"
            >
              {status === "Sending..." ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p
                className={`text-center mt-3 ${
                  status.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
