import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/reservations", label: "Reservations" },
    { path: "/about", label: "About" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      background: "#eee",
      padding: "1rem",
    }}>
      {links.map(link => (
        <Link key={link.path} to={link.path}>{link.label}</Link>
      ))}
    </nav>
  );
}
