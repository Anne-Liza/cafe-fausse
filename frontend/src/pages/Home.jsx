// export default function Home() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <h1>Welcome to Café Fausse</h1>
//       <p>Fine dining, timeless flavor.</p>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <h1 className="text-5xl font-bold text-primary mb-4">Welcome to Café Fausse</h1>
      <button className="btn btn-primary">Reserve a Table</button>
    </div>
  );
}
