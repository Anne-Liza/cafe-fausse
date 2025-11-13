import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const location = useLocation();
  const orderInfo = location.state || {}; // optional order data passed from checkout/payment

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="bg-[#fffaf7] min-h-screen flex flex-col justify-center items-center text-center px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🎉 Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        className="bg-green-100 rounded-full p-6 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="green"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </motion.div>

      {/* 🧾 Confirmation Message */}
      <h1 className="text-4xl font-bold text-[#a44b23] mb-4">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Your order has been received and is being prepared with care.
        You’ll receive an email or SMS confirmation shortly with your order details.
      </p>

      {/* Order Summary */}
      {orderInfo.total && (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-8 text-left">
          <h2 className="text-xl font-semibold text-[#a44b23] mb-3">
            Order Summary
          </h2>
          <p><span className="font-semibold">Order ID:</span> {orderInfo.id || "CF-2025"}</p>
          <p><span className="font-semibold">Payment Method:</span> {orderInfo.payment || "Card"}</p>
          <p><span className="font-semibold">Total Paid:</span> KSH {orderInfo.total}</p>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/menu"
          className="btn btn-outline border-[#a44b23] text-[#a44b23] hover:bg-[#a44b23] hover:text-white"
        >
          Order More
        </Link>
        <Link
          to="/"
          className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c]"
        >
          Back to Home
        </Link>
      </div>

      {/* Footer note */}
      <p className="text-sm text-gray-500 mt-12">
        Café Fausse — redefining fine dining with modern elegance.
      </p>
    </motion.div>
  );
}
