import { useState } from "react";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", guests: "", time_slot: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok)
        setMessage(`✅ Table booked! Table ${data.reservation.table_number}`);
      else setMessage(`❌ ${data.error}`);

      setFormData({ name: "", email: "", phone: "", guests: "", time_slot: "" });
    } catch {
      setMessage("⚠️ Could not connect to backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {["name", "email", "phone", "guests", "time_slot"].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" :
                field === "phone" ? "tel" :
                field === "guests" ? "number" :
                field === "time_slot" ? "datetime-local" : "text"}
          name={field}
          placeholder={field.replace("_", " ").toUpperCase()}
          value={formData[field]}
          onChange={handleChange}
          required={field !== "phone"}
        />
      ))}
      <button type="submit">Book Reservation</button>
      {message && <p>{message}</p>}
    </form>
  );
}
