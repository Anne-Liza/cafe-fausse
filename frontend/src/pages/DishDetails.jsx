import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function DishDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // For now, simulate pulling dish data from your Menu
  const dishes = [
    {
      id: "1",
      name: "Fudge Obsession",
      price: 580,
      desc: "Rich chocolate cake served warm with ice cream.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      name: "Brownie Indulgence",
      price: 580,
      desc: "Dense fudge brownie topped with vanilla ice cream.",
      image: "https://images.unsplash.com/photo-1619983081563-430f6360277d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const dish = dishes.find((d) => d.id === id);

  if (!dish)
    return <p className="text-center py-20 text-gray-600">Dish not found</p>;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <img
        src={dish.image}
        alt={dish.name}
        className="rounded-xl shadow-lg mb-6 w-full h-[400px] object-cover"
      />
      <h1 className="text-4xl font-bold mb-2 text-[#a44b23]">{dish.name}</h1>
      <p className="text-gray-600 mb-4">{dish.desc}</p>
      <p className="text-2xl font-semibold mb-6">KSH {dish.price}</p>

      <div className="flex gap-4">
        <button
          onClick={() => {
            addToCart({
              name: dish.name,
              price: dish.price,
              image: dish.image,
            });
            navigate("/cart");
          }}
          className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c]"
        >
          Add to Order
        </button>

        <button className="btn btn-outline text-[#a44b23] hover:bg-[#a44b23] hover:text-white">
          ❤️ Add to Favourites
        </button>
      </div>
    </div>
  );
}
