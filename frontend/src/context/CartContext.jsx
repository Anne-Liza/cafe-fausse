import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// Create the context
const CartContext = createContext();

// Provider component
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // ✅ Add item to cart
  const addToCart = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        toast.success(`Added another ${item.name}`);
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success(`${item.name} added to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ Remove single item
  const removeFromCart = (name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
    toast(`Removed ${name} from cart`, { icon: "🗑️" });
  };

  // ✅ Clear entire cart
  const clearCart = () => {
    setItems([]);
    toast("Cart cleared", { icon: "🧹" });
  };

  // ✅ Increase quantity
  const increaseQuantity = (name) => {
    setItems((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (name) => {
    setItems((prev) =>
      prev.map((i) =>
        i.name === name && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  // ✅ Compute subtotal
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use the cart context
export function useCart() {
  return useContext(CartContext);
}
