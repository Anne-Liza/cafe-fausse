import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // form state
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "card",
  });

  const vat = totalPrice * 0.16;
  const ctl = totalPrice * 0.02;
  const grandTotal = totalPrice + vat + ctl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // 🔴 changed to async and now calls backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!details.name || !details.phone || !details.address) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      // send order to backend
      const res = await fetch("http://127.0.0.1:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: details.name,
            email: details.email,
            phone: details.phone,
            address: details.address,
          },
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: grandTotal,
          payment: details.payment,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to place order. Please try again.");
        return;
      }

      toast.success("Order placed successfully!");

      clearCart();

      // Simulate payment step
      setTimeout(() => {
        navigate(`/payment?method=${details.payment}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="bg-[#fffaf7] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-[#a44b23] mb-6 text-center">
          Checkout
        </h1>

        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Your cart is empty. Add items before checkout.
            </p>
            <Link
              to="/menu"
              className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c]"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-[#a44b23]">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={details.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  value={details.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="address"
                  value={details.address}
                  onChange={handleChange}
                  placeholder="Delivery Address"
                  required
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-[#a44b23]">
                Payment Method
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={details.payment === "card"}
                    onChange={handleChange}
                  />
                  💳 Card
                </label>
                <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={details.payment === "paypal"}
                    onChange={handleChange}
                  />
                  🅿️ PayPal
                </label>
                <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mobile"
                    checked={details.payment === "mobile"}
                    onChange={handleChange}
                  />
                  📱 Mobile Money
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#fffaf7] p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <p>Subtotal: KSH {totalPrice.toFixed(2)}</p>
              <p>VAT (16%): KSH {vat.toFixed(2)}</p>
              <p>CTL (2%): KSH {ctl.toFixed(2)}</p>
              <hr className="my-2" />
              <p className="font-bold text-[#a44b23]">
                Total: KSH {grandTotal.toFixed(2)}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Delivery charges apply depending on your location.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link
                to="/cart"
                className="btn btn-outline w-full sm:w-auto"
              >
                Back to Cart
              </Link>
              <button
                type="submit"
                className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] w-full sm:w-auto"
              >
                Confirm & Proceed to Payment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
