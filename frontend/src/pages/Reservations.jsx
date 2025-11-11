// src/pages/Reservations.jsx
import { useState } from "react";

export default function Reservations() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    diningExperience: "",
    guests: "",
    specialRequest: "",
    agreeToPolicy: false,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeToPolicy) {
      setStatus("Please agree to the privacy policy first.");
      return;
    }

    setStatus("Submitting...");

    // Combine names & map to backend fields
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone_number: formData.phone,
      date: formData.date,
      time: formData.time,
      party_size: formData.guests,
      special_request: formData.specialRequest,
      dining_experience: formData.diningExperience,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("Reservation request sent! We’ll confirm by phone or email.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          diningExperience: "",
          guests: "",
          specialRequest: "",
          agreeToPolicy: false,
        });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-[#fffaf7] text-gray-900 min-h-screen">
      {/* === HERO BANNER === */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h2 className="text-sm tracking-[0.3em] text-gray-200 mb-2">
            CAFÉ FAUSSE
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            FINE DINING RESERVATIONS
          </h1>
        </div>
      </section>

      {/* === INTRO TEXT (like “YOU ARE RESERVING…” section) === */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          You are making a reservation request and it may or may not be
          confirmed immediately. Your booking confirmation will be shared
          via phone or email.
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
          <span className="text-[#c62828]">YOU ARE RESERVING A TABLE AT</span>{" "}
          <span className="block md:inline text-4xl md:text-5xl">
            CAFÉ FAUSSE
          </span>
        </h2>
      </section>

      {/* === RESERVATION FORM === */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg px-6 md:px-10 py-10 space-y-8"
        >
          {/* Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Date / Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Time <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Dining experience / guests */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Dining Experience <span className="text-red-600">*</span>
              </label>
              <select
                name="diningExperience"
                value={formData.diningExperience}
                onChange={handleChange}
                required
                className="select select-bordered w-full"
              >
                <option value="">Select</option>
                <option value="main-dining">Main Dining Room</option>
                <option value="chef-table">Chef’s Table</option>
                <option value="terrace">Terrace</option>
                <option value="private-room">Private Dining Room</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Guests <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                min="1"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Special request */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Special Request
            </label>
            <textarea
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Allergies, celebrations, seating preferences..."
            />
          </div>

          {/* Policy + (placeholder) captcha */}
          <div className="space-y-4">
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agreeToPolicy"
                checked={formData.agreeToPolicy}
                onChange={handleChange}
                className="checkbox mt-1"
              />
              <span>
                I have read and agreed to Café Fausse’s{" "}
                <span className="text-[#a44b23] underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </span>
            </label>

            {/* Captcha placeholder */}
            <div className="border rounded-lg p-4 text-center text-gray-500 text-sm bg-gray-50">
              [ CAPTCHA PLACEHOLDER ] – e.g. hCaptcha or reCAPTCHA in production
            </div>
          </div>

          {/* Submit button & status */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="btn bg-[#c62828] border-none text-white px-10 text-lg hover:bg-[#a31f1f]"
              disabled={status === "Submitting..."}
            >
              {status === "Submitting..." ? "Submitting..." : "Submit"}
            </button>

            {status && status !== "Submitting..." && (
              <p
                className={`text-sm ${
                  status.startsWith("Reservation")
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
