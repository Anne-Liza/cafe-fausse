// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import NewsletterSignup from "../components/NewsletterSignup";

// export default function MainLayout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-[#fffaf7] text-gray-800">{children}</main>
//       <NewsletterSignup />
//       <Footer />
//     </>
//   );
// }

// src/layouts/MainLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf7] text-gray-800">
      {/* Top: navbar */}
      <Navbar />

      {/* Middle: page content grows to push footer down */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Bottom: footer sticks to bottom when content is short */}
      <Footer />
    </div>
  );
}
