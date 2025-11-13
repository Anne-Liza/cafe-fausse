import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-8 max-w-7xl mx-auto sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          Café Fausse
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>

        </ul>
        <Link
          to="/reservations"
          className="btn bg-[#a44b23] text-white ml-4 hover:bg-[#8a3d1c]"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
