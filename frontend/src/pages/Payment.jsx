import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const method = params.get("method") || "card"; // default tab

  const [activeTab, setActiveTab] = useState(method);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setActiveTab(method);
  }, [method]);

  const handlePayment = () => {
    setIsProcessing(true);
    toast.loading("Processing payment...", { id: "payment" });

    // simulate 3s API call
    setTimeout(() => {
      toast.success("Payment successful!", { id: "payment" });
      navigate("/order-success", {
  state: {
    total:  grandTotal || "—",
    payment: activeTab,
    id: "CF" + Math.floor(Math.random() * 1000000),
  },
});

    }, 3000);
  };

  return (
    <div className="bg-[#fffaf7] min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#a44b23] mb-6">
          Complete Your Payment
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {["card", "paypal", "mobile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 border-b-2 ${
                activeTab === tab
                  ? "border-[#a44b23] text-[#a44b23] font-semibold"
                  : "border-transparent text-gray-500 hover:text-[#a44b23]"
              }`}
            >
              {tab === "card" && "💳 Card"}
              {tab === "paypal" && "🅿️ PayPal"}
              {tab === "mobile" && "📱 Mobile Money"}
            </button>
          ))}
        </div>

        {/* === CARD PAYMENT === */}
        {activeTab === "card" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePayment();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Cardholder Name"
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Card Number"
              required
              className="input input-bordered w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                required
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] w-full"
            >
              {isProcessing ? "Processing..." : "Pay with Card"}
            </button>
          </form>
        )}

        {/* === PAYPAL === */}
        {activeTab === "paypal" && (
          <div className="text-center space-y-6">
            <p className="text-gray-600">
              You’ll be redirected to PayPal to complete your payment.
            </p>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="btn bg-[#003087] text-white hover:bg-[#002060] w-full"
            >
              {isProcessing ? "Redirecting..." : "Continue with PayPal"}
            </button>
          </div>
        )}

        {/* === MOBILE MONEY === */}
        {activeTab === "mobile" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePayment();
            }}
            className="space-y-4"
          >
            <input
              type="tel"
              placeholder="Mobile Number (e.g. 07xx xxx xxx)"
              required
              className="input input-bordered w-full"
            />
            <select required className="select select-bordered w-full">
              <option value="mpesa">M-Pesa</option>
              <option value="airtel">Airtel Money</option>
              <option value="tkash">T-Kash</option>
            </select>
            <button
              type="submit"
              disabled={isProcessing}
              className="btn bg-[#a44b23] text-white hover:bg-[#8a3d1c] w-full"
            >
              {isProcessing ? "Processing..." : "Pay with Mobile Money"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-500 text-sm mt-8">
          Secure payment powered by Café Fausse.
        </p>
      </div>
    </div>
  );
}
