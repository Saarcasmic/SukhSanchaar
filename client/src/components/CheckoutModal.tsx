import React, { useState } from "react";
import { X, CreditCard, Loader2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import { RazorpayService } from "../utils/razorpay";

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { state, clearCart, toggleCart, processPayment, clearPaymentError } =
    useCart();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping charges based on state
  const getShippingCharges = (state: string) => {
    switch (state) {
      case "Delhi":
      case "Uttar Pradesh":
        return 0;
      default:
        return 30;
  };

  const shippingCharges = getShippingCharges(formData.state);
  const subtotal = state.total;
  const totalWithShipping = subtotal + shippingCharges;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number
    if (name === "phone") {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, "");

      // If phone starts with 0 and has 11 digits total, remove the leading 0
      let formattedPhone = digitsOnly;
      if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
        formattedPhone = digitsOnly.substring(1);
      }

      // Limit to 10 digits
      formattedPhone = formattedPhone.substring(0, 10);

      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePayment = async () => {
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate phone number is exactly 10 digits
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if (!RazorpayService.isAvailable()) {
      alert("Payment service is not available. Please try again later.");
      return;
    }

    // Set loading state
    setIsProcessing(true);

    try {
      // Clear any previous payment errors
      clearPaymentError();

      // Step 1: Create order in database first
      const orderData = {
        customer_name: formData.customerName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: {
          street:
            formData.addressLine1 +
            (formData.addressLine2 ? `, ${formData.addressLine2}` : ""),
          city: formData.city,
          state: formData.state,
          pincode: "", // You might want to add pincode field
          country: formData.country,
        },
        items: state.items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        notes: `Order for ${state.items.length} item(s) - Sukh Sancharak Co.`,
      };

      const API_BASE_URL =
        (import.meta as any).env?.VITE_API_BASE_URL ||
        "http://localhost:3001/api";
      const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderResult = await orderResponse.json();
      if (!orderResult.success) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      const createdOrder = orderResult.data;
      console.log("Order created in database:", createdOrder);

      // Step 2: Create Razorpay order with shipping included
      const RAZORPAY_API_URL =
        (import.meta as any).env?.VITE_API_BASE_URL ||
        "http://localhost:3001/api";
      const razorpayOrderResponse = await fetch(
        `${RAZORPAY_API_URL}/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalWithShipping, // Include shipping charges
            currency: "INR",
            receipt: `order_${Date.now()}`,
            customer_details: {
              name: formData.customerName,
              email: formData.email,
              phone: formData.phone,
              address:
                formData.addressLine1 +
                (formData.addressLine2 ? `, ${formData.addressLine2}` : ""),
            },
          }),
        },
      );

      if (!razorpayOrderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const razorpayOrderData = await razorpayOrderResponse.json();
      if (!razorpayOrderData.success) {
        throw new Error(
          razorpayOrderData.error || "Failed to create Razorpay order",
        );
      }

      const paymentData = {
        order_id: razorpayOrderData.data.order_id,
        amount: razorpayOrderData.data.amount,
        currency: razorpayOrderData.data.currency,
        receipt: razorpayOrderData.data.receipt,
      };

      // Step 3: Create Razorpay checkout options
      const fullAddress = `${formData.addressLine1}${formData.addressLine2 ? ", " + formData.addressLine2 : ""}, ${formData.city}, ${formData.state}, ${formData.country}`;
      const orderItemsDescription = state.items
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ");
      const description = `Sukh Sancharak Co. Order - ${orderItemsDescription} | Address: ${fullAddress} | Total: ₹${totalWithShipping}`;

      const checkoutOptions = RazorpayService.createCheckoutOptions(
        paymentData.order_id,
        totalWithShipping * 100, // Convert to paise for Razorpay
        paymentData.currency,
        formData.customerName,
        formData.email,
        formData.phone,
        description,
      );

      // Step 4: Open Razorpay checkout
      const razorpayResponse =
        await RazorpayService.openCheckout(checkoutOptions);

      // Step 5: Process payment verification with order ID
      console.log(
        "Processing payment verification with order_id:",
        createdOrder.id,
      );
      const verificationResult = await processPayment(
        razorpayResponse,
        createdOrder.id,
      );

      if (verificationResult.status === "captured") {
        // Add to admin context for display
        const adminOrderData = {
          customer_name: formData.customerName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: {
            street:
              formData.addressLine1 +
              (formData.addressLine2 ? `, ${formData.addressLine2}` : ""),
            city: formData.city,
            state: formData.state,
            pincode: "",
            country: formData.country,
          },
          items: state.items.map((item) => ({
            product_id: item.id,
            product_name: item.name,
            product_image: item.image || "",
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
          })),
          subtotal: state.total,
          tax_amount: 0,
          shipping_amount: shippingCharges,
          total_amount: totalWithShipping,
          payment_status: "paid" as const,
          order_status: "confirmed" as const,
          payment_method: "razorpay",
          notes: `Order for ${state.items.length} item(s) - Sukh Sancharak Co.`,
        };

        addOrder(adminOrderData);
        clearCart();
        toggleCart();
        onClose();
        navigate("/payment-success");
      } else {
        throw new Error("Payment not captured");
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (
        error instanceof Error &&
        error.message !== "Payment cancelled by user"
      ) {
        alert(`Payment failed: ${error.message}`);
      }
    } finally {
      // Reset loading state
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="font-playfair text-2xl font-bold text-antique-brown flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Checkout
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block font-noto font-semibold text-antique-brown mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block font-noto font-semibold text-antique-brown mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-noto font-semibold text-antique-brown mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              placeholder="Enter your 10 digit phone number"
            />
          </div>

          <div>
            <label className="block font-noto font-semibold text-antique-brown mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              placeholder="Street address, building, apartment"
            />
          </div>

          <div>
            <label className="block font-noto font-semibold text-antique-brown mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-noto font-semibold text-antique-brown mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label className="block font-noto font-semibold text-antique-brown mb-2">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              >
                <option value="">Select State</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-noto font-semibold text-antique-brown mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent"
              placeholder="Country"
              disabled={true}
            />
          </div>

          {/* Order Summary */}
          <div className="bg-cream-50 p-4 rounded-lg border border-cream-200">
            <h3 className="font-lora font-semibold text-antique-brown mb-2">
              Order Summary
            </h3>
            <div className="space-y-2">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between font-noto text-sm"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-black pt-2 mt-2">
                <div className="flex justify-between font-noto text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>
              <div className="flex justify-between font-noto text-sm">
                <span>Shipping Charges</span>
                <span>
                  {shippingCharges === 0 ? (
                    <span className="text-green-600 font-semibold">FREE!</span>
                  ) : (
                    <>₹{shippingCharges}</>
                  )}
                </span>
              </div>
              <div className="border-t border-cream-300 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-ayur-red">₹{totalWithShipping}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center font-noto">
            Your payment is secured by Razorpay. Shipping details will be sent
            via WhatsApp.
          </p>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white rounded-b-xl">
          {/* Payment Error Display */}
          {state.paymentError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4">
              <p className="font-semibold">Payment Error</p>
              <p>{state.paymentError}</p>
              <button
                onClick={clearPaymentError}
                className="mt-2 text-red-600 hover:text-red-800 underline text-xs"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || state.paymentLoading}
            className="w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Payment...
              </>
            ) : state.paymentLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${totalWithShipping}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
