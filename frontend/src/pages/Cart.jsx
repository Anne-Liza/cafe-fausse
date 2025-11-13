// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  // Tax calculations
  const vat = totalPrice * 0.16;
  const ctl = totalPrice * 0.02;
  const grandTotal = totalPrice + vat + ctl;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="bg-[#fffaf7] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#a44b23] mb-8 text-center">
          Your Order
        </h1>

        {/* === Empty Cart === */}
        {items.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
              alt="Empty cart"
              className="w-40 mx-auto mb-6 opacity-80"
            />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Start your order from our delicious menu.
            </p>
            <Link
              to="/menu"
              className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c]"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* === Cart Items === */}
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-xl shadow-md p-4 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1 w-full">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-500 mb-2">
                      Price: KSH {item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="btn btn-sm"
                      >
                        −
                      </button>
                      <span className="text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="btn btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold mb-2">
                      Total: KSH {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => {
                        removeFromCart(item.name);
                        toast(`Removed ${item.name}`, { icon: "🗑️" });
                      }}
                      className="btn btn-xs btn-outline"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* === Summary Section === */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-3 mt-10">
              <h2 className="text-2xl font-bold mb-3">Order Summary</h2>
              <p>
                Subtotal:{" "}
                <span className="font-semibold">
                  KSH {totalPrice.toFixed(2)}
                </span>
              </p>
              <p>
                VAT (16%):{" "}
                <span className="font-semibold">KSH {vat.toFixed(2)}</span>
              </p>
              <p>
                CTL (2%):{" "}
                <span className="font-semibold">KSH {ctl.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Delivery charges apply depending on location.
              </p>
              <hr />
              <p className="text-xl font-bold text-[#a44b23]">
                Grand Total: KSH {grandTotal.toFixed(2)}
              </p>
            </div>

            {/* === Buttons === */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
              <button
                onClick={() => {
                  clearCart();
                  toast("Cart cleared", { icon: "🧹" });
                }}
                className="btn btn-outline w-full sm:w-auto"
              >
                Clear Cart
              </button>

              <Link
                to="/menu"
                className="btn btn-outline w-full sm:w-auto"
              >
                Add More Items
              </Link>

              <button
                onClick={handleCheckout}
                className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] w-full sm:w-auto"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
