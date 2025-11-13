// src/layouts/MainLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsletterSignup from "../components/NewsletterSignup";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf7] text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Newsletter section - above the footer */}
      <NewsletterSignup />

      {/* Footer (sticky at bottom if content is short) */}
      <Footer />
    </div>
  );
}
