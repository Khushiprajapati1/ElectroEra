import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useOrder } from "../store/order-context";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const location = useLocation();
  const selectedCartItems = location.state?.cart || [];
  const { user } = useAuth();
  const userId = user._id;

  const [address, setAddress] = useState(null);
  //const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    houseNo: "",
    street: "",
    landmark: "",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "",
  });
  const getTotalAmount = () => {
    return selectedCartItems.reduce((acc, item) => {
      const price = Number(item.product.price.replace(/,/g, ""));
      const quantity = Number(item.quantity);
      return acc + price * quantity;
    }, 0);
  };

  const { placeOrder } = useOrder();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          "https://electroera.onrender.com/api/address/getAddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userId }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          setAddress(data.message);
        } else if (response.status === 404) {
          setAddress(null);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddress();
    window.scrollTo(0, 0);
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = address
        ? "https://electroera.onrender.com/api/address/updateAddress"
        : "https://electroera.onrender.com/api/address/addAddress";

      const method = address ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, user: userId }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setShowAddressForm(false);
        setAddress({ ...formData });
      } else { 
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRazorpay = async () => {
    const amountInPaise = getTotalAmount() * 100;
    try {
      const response = await fetch(
        "https://electroera.onrender.com/api/payment/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amountInPaise }),
        }
      );

      const data = await response.json();
      // console.log("Razorpay Order Data:", data);
      if (!data.success) throw new Error("Failed to create Razorpay order");

      const options = {
        key: "rzp_test_PGwbWJqXMdQf1Q",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "ElectroEra",
        description: "Order processing with Payment",
        // image: "/images/AC_1.png",
        order_id: data.order.id,
        handler: async function (response) {
          const formattedProducts = selectedCartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            totalPrice: item.totalPrice || Number(item.product.price.replace(/,/g, "")) * Number(item.quantity),
          }));

          const orderData = {
            user: userId,
            products: formattedProducts,
            address: address._id,
            finalPrice: getTotalAmount(),
            paymentMethod: "Razorpay",
            paymentStatus: "Paid",
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            setLoading(true);
            const res = await placeOrder(orderData);
            setLoading(false);

            if (res.success) {
              const recievedorderId = res.order._id;
              //setOrderId(recievedorderId);
              setOrder(res.order);
              setStep(3);
              toast.success("Order placed successfully");
              //alert(recievedorderId)
            }
          } catch (error) {
            toast.error("Order placement failed.");
          }
        },
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: user?.phone,
        },
        method: {
          netbanking: true,
          card: false,
          upi: false,
          wallet: false,
          emi: false,
          paylater: false,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      // console.log("key: ",options.key)
    } catch (error) {
      console.error(error);
      toast.error("Payment initiation failed");
    }

    // const rzp = new window.Razorpay(options);
    // rzp.open();
  };

  const handleCOD = async () => {
    const formattedProducts = selectedCartItems.map((item) => ({
      product: item.product._id, // extract just the ID
      quantity: item.quantity,
      totalPrice: item.totalPrice || Number(item.product.price.replace(/,/g, "")) * Number(item.quantity),
    }));
    const orderData = {
      user: userId,
      products: formattedProducts,
      address: address._id,
      finalPrice: getTotalAmount(),
      paymentMethod: "COD",
    };
    //console.log(selectedCartItems);
    try {
      setLoading(true);
      const res = await placeOrder(orderData);
      setLoading(false);

      if (res.success) {
        const recievedorderId = res.order._id;
        //setOrderId(recievedorderId);
        setOrder(res.order);
        setStep(3);
        toast.success("Order placed successfully");
        //alert(order)
      }
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  const [step, setStep] = useState(1);
  let formattedEstimatedDate = "";

if (order && order.createdAt) {
  const createdAt = new Date(order.createdAt);
  const estimatedDelivery = new Date(createdAt);
  estimatedDelivery.setDate(createdAt.getDate() + 2);

  const options = { day: "numeric", month: "long" };
  formattedEstimatedDate = estimatedDelivery.toLocaleDateString("en-IN", options);
}

  const nextStep = () => {
    if (step === 1 && !address) {
      toast.error("Please save your delivery address before continuing.");
      return;
    }
    if (step < 3) setStep(step + 1);
  };
  const navigate = useNavigate();

  const steps = ["Checkout", "Payment", "Confirmation"];
  const StepHeader = () => (
    <div className="w-full max-w-4xl mx-auto py-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:justify-between gap-4 mb-9">
  {steps.map((label, index) => {
    const isCompleted = step > index + 1;
    const isActive = step === index + 1;

    return (
      <div key={index} className="flex items-start sm:items-center w-full sm:w-auto relative">
        {/* Step Circle + Label */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
              ${
                isCompleted
                  ? "bg-pink-400 border-pink-400 text-white"
                  : isActive
                  ? "border-pink-400 text-pink-400"
                  : "border-gray-400 text-gray-400"
              }`}
          >
            {index + 1}
          </div>
          <span
            className={`ml-2 text-sm font-semibold
              ${
                isCompleted
                  ? "text-pink-400"
                  : isActive
                  ? "text-pink-400"
                  : "text-gray-400"
              }`}
          >
            {label}
          </span>
        </div>

        {/* Connector Line */}
        {index < steps.length - 1 && (
          <div
            className={`absolute left-4 top-10 sm:top-1/2 sm:left-full sm:ml-4 sm:h-0.5 sm:w-12 h-6 w-0.5 
              ${step > index + 1 ? "bg-pink-400" : "bg-gray-400"}`}
          ></div>
        )}
      </div>
    );
  })}
</div>
</div>

  );
  const continueShopping = ()=>{
    setTimeout(()=>{
      window.location.reload();

    },1000);
    navigate("/");
  }

  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <StepHeader />
  
        <div className="space-y-8">
          {step === 1 && (
            <>
              {selectedCartItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-pink-400 transition-colors"
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <img
                      src={item.product?.images?.[0] || "/fallback-image.jpg"}
                      alt={item.product?.name || "Product"}
                      className="w-full max-w-[8rem] h-auto object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold text-white">
                        {item.product?.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Price:</span>
                          <span className="ml-2 text-white">
                            ₹{item.product?.price}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Amount:</span>
                          <span className="ml-2">
                            ₹
                            {item.totalPrice ||
                              Number(item.product.price.replace(/,/g, "")) *
                                Number(item.quantity)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Quantity:</span>
                          <span className="ml-2">{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
  
              {/* Address Section */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Delivery Address</h3>
                  {address && !showAddressForm && (
                    <button
                      onClick={() => {
                        setFormData(address);
                        setShowAddressForm(true);
                      }}
                      className="cursor-pointer text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
  
                {address && !showAddressForm ? (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{user.username}</p>
                    <p className="flex items-center gap-2 text-gray-300">
                      <FaPhone className="text-indigo-400" /> {user.phone}
                    </p>
                    <p className="flex items-start gap-2 text-gray-300">
                      <FaMapMarkerAlt className="text-indigo-400 mt-1" />
                      <span>
                        {`${address.houseNo}, ${address.street}, ${address.landmark}, ${address.city}, ${address.state}, ${address.pincode}`}
                      </span>
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleAddressSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <input
                      type="text"
                      name="houseNo"
                      placeholder="House No."
                      value={formData.houseNo}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="landmark"
                      placeholder="Landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      readOnly
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      readOnly
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                      required
                      maxLength={6}
                    />
                    <button
                      type="submit"
                      className="cursor-pointer font-bold md:col-span-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:scale-103 text-white py-2 rounded-lg transition-colors"
                    >
                      Save Address
                    </button>
                  </form>
                )}
              </div>
  
              {/* Order Summary */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Order Summary</h3>
                  <span className="text-2xl font-bold text-white">
                    ₹{getTotalAmount()}
                  </span>
                </div>
                <button
                  onClick={nextStep}
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  Continue to Payment <FaArrowRight />
                </button>
              </div>
            </>
          )}
  
          {/* Step 2 - Payment */}
          {step === 2 && (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-center mb-8">
                Select Payment Method
              </h2>
  
              <div className="space-y-4">
                <label className="block p-4 border border-gray-700 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="ml-4">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-400">Pay when you receive</p>
                    </div>
                  </div>
                </label>
  
                <label className="block p-4 border border-gray-700 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="ml-4">
                      <p className="font-medium">Razorpay</p>
                      <p className="text-sm text-gray-400">
                        Pay securely online
                      </p>
                    </div>
                  </div>
                </label>
              </div>
  
              <div className="mt-8">
                <button
                  onClick={paymentMethod === "razorpay" ? handleRazorpay : handleCOD}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-medium transition-colors cursor-pointer
                    ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : paymentMethod === "razorpay"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {loading
                    ? "Processing..."
                    : paymentMethod === "razorpay"
                    ? "Pay with Razorpay"
                    : "Place Order (COD)"}
                </button>
              </div>
            </div>
          )}
  
          {/* Step 3 - Confirmation */}
          {step === 3 && order && (
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 text-center">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
  
              <div className="bg-gray-700 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4 text-lg">Order Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p>
                    Order ID: <span className="text-white">{order._id}</span>
                  </p>
                  <p>
                    Total Amount:{" "}
                    <span className="text-white">₹{order.finalPrice}</span>
                  </p>
                  <p>
                    Estimated Delivery:{" "}
                    <span className="text-green-400 font-medium">
                      {formattedEstimatedDate}
                    </span>
                  </p>
                </div>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate(`/Invoice`, { state: { order } })}
                  className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
                >
                  View Invoice
                </button>
                <button
                  onClick={continueShopping}
                  className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Checkout;
