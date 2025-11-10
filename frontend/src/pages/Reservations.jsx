import ReservationForm from "../components/ReservationForm";

export default function Reservations() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}>
      <h1>Reserve a Table</h1>
      <ReservationForm />
    </div>
  );
}
