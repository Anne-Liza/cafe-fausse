import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}
