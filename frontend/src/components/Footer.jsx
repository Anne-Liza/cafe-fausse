// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#a44b23] text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 text-sm">

        {/* --- Brand Info --- */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Café Fausse</h3>
          <p>
            1234 Culinary Ave, Suite 100<br />
            Washington, DC 20002
          </p>
          <p className="mt-3">
            📞 (202) 555-4567 <br />
            ✉️ hello@cafefausse.com
          </p>
          <p className="mt-3">
            Mon–Sat: 5 PM – 11 PM <br />
            Sun: 5 PM – 9 PM
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/menu" className="hover:underline">Menu</Link></li>
            <li><Link to="/reservations" className="hover:underline">Reservations</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* --- Socials --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p className="mb-4 text-gray-100">
            Stay connected and discover the art of fine dining.
          </p>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-200">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-200">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-200">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Café Fausse · All Rights Reserved
      </div>
    </footer>
  );
}
