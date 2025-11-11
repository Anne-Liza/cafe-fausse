import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch {
      setMessage("⚠️ Could not connect to backend.");
    }
  };

  return (
    <section className="bg-[#fffaf7] py-16 text-center text-gray-800">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6 text-lg text-gray-600">
          Get exclusive dining offers, chef’s specials, and event invitations
          delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full sm:w-auto flex-1 rounded-md px-4 py-3 border-gray-300"
          />
          <button
            type="submit"
            className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] px-8"
          >
            Subscribe
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </section>
  );
}
