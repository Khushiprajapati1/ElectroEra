import React from "react";
import {
  FiUser,
  FiCalendar,
  FiTruck,
  FiCreditCard,
  FiShoppingCart,
} from "react-icons/fi";
import { TbInvoice } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { toast } from "react-toastify";

const InvoicePage = () => {
  // const order = {
  //   paymentMethod: "Cash on Delivery",
  //   paymentStatus: "Pending",
  //   note: "Please keep ₹75,000 ready at the time of delivery",
  // };
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5); // default 5 stars
  const [comment, setComment] = useState("");
  const createdAt = new Date(order.createdAt);
  const options = { day: "numeric", month: "long" };
  const formattedEstimatedDate = createdAt.toLocaleDateString("en-IN", options);

  const handleGiveReview = () => {
    setShowReviewForm(true); // Show the review form when "Give Review" is clicked
  };

  const submitReview = async (userId, productIds, rating, comment) => {
    try {
      for (const productId of productIds) {
        const response = await fetch(
          "https://electroera.onrender.com/api/review/createReview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: userId,
              product: productId,
              rating,
              comment,
            }),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message);

          setTimeout(() => {
            window.location.reload();
          }, 1000);

          navigate("/");
          throw new Error(`Failed to submit review for product ${productId}`);
        }
      }

      toast.success("Review submitted for all products!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/"); // or wherever you want to go
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // const downloadInvoice = () => {
  //   const doc = new jsPDF();

  //   // Add title
  //   doc.setFontSize(18);
  //   doc.text("Invoice", 14, 20);

  //   // Add order number
  //   doc.setFontSize(12);
  //   doc.text(`Order #: ${order._id}`, 14, 30);

  //   // Customer Info
  //   doc.text(`Customer Name: ${order.user.username}`, 14, 40);
  //   doc.text(`Email: ${order.user.email}`, 14, 50);
  //   doc.text(`Address: ${order.address.houseNo}`, 14, 60);

  //   // Order Summary
  //   doc.text("Order Summary", 14, 70);
  //   order.products.forEach((item, idx) => {
  //     doc.text(
  //       `${item.product.name} - Qty: ${item.quantity} - ₹${item.totalPrice}`,
  //       14,
  //       80 + 10 * idx
  //     );
  //   });

  //   // Payment Info
  //   doc.text(`Payment Method: ${order.paymentMethod}`, 14, 100);
  //   doc.text(`Payment Status: ${order.paymentStatus}`, 14, 110);

  //   // Final Price
  //   doc.text(`Final Price: ₹${order.finalPrice}`, 14, 120);

  //   // Save the document as PDF
  //   doc.save(`ElectroEra_Invoice_${order._id}.pdf`);
  // };

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Set universal padding
    const marginLeft = 14;
    let y = 20;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ElectroEra Invoice", marginLeft, y);

    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleString()}`,
      marginLeft,
      y
    );

    y += 10;
    doc.text(`Order #: ${order._id}`, marginLeft, y);

    // Divider
    y += 10;
    doc.line(marginLeft, y, 200, y); // horizontal line

    // Customer Info
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Customer Information", marginLeft, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${order.user.username}`, marginLeft, y);
    y += 7;
    doc.text(`Email: ${order.user.email}`, marginLeft, y);
    y += 7;
    doc.text(`Address: ${order.address.houseNo}`, marginLeft, y);

    // Divider
    y += 10;
    doc.line(marginLeft, y, 200, y);

    // Order Summary
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Order Summary", marginLeft, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    order.products.forEach((item, idx) => {
      const text = `${item.product.name} - Qty: ${item.quantity} - Price: ₹${item.totalPrice}`;

      // Define max width (e.g., 180 mm from left margin of 14 mm)
      const maxWidth = 180;

      // Split text into lines that fit the width
      const splitText = doc.splitTextToSize(text, maxWidth);

      // Add line(s) to PDF
      doc.text(splitText, marginLeft, y);

      // Increment y based on how many lines were added
      y += 7 * splitText.length;
    });

    // Divider
    y += 5;
    doc.line(marginLeft, y, 200, y);

    // Payment Info
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", marginLeft, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Method: ${order.paymentMethod}`, marginLeft, y);
    y += 7;
    doc.text(`Status: ${order.paymentStatus}`, marginLeft, y);

    // Final Price
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount Paid: ₹${order.finalPrice}`, marginLeft, y);

    // Footer
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with ElectroEra!", marginLeft, y);

    // Save
    doc.save(`ElectroEra_Invoice_${order._id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-gray-800 flex items-center justify-center p-4 sm:p-10">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center gap-2 text-gray-800">
            <TbInvoice className="text-3xl" />
            <h1 className="text-3xl font-bold">ElectroEra Invoice</h1>
          </div>
          <div className="text-center sm:text-right text-gray-500 text-sm mt-2 sm:mt-0">
            <p className="flex items-center justify-center sm:justify-end gap-1">
              <FiCalendar /> {formattedEstimatedDate}
            </p>
            <p>
              Order #: <span className="font-medium">{order._id}</span>
            </p>
          </div>
        </div>
  
        {/* Customer Info */}
        <div className="mb-6">
          <h2 className="font-semibold text-xl flex items-center gap-2 mb-2 text-gray-800">
            <FiUser /> Customer Info
          </h2>
          <div className="text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Name:</span> {order.user.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.user.email}
            </p>
            <p>
              <span className="font-medium">Address: </span>
              {`${order.address.houseNo}, ${order.address.street}, ${order.address.landmark}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}`}
            </p>
          </div>
        </div>
  
        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="font-semibold text-xl flex items-center gap-2 mb-2 text-gray-800">
            <FiTruck /> Order Summary
          </h2>
          <div className="overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-300 text-gray-700">
                <tr>
                  <th className="p-3 border-b">Product</th>
                  <th className="p-3 border-b">Qty</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 bg-white">
                {order.products.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3">{item.product.name}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">₹{item.product.price}</td>
                    <td className="p-3">₹{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Totals */}
        <div className="mb-6 text-gray-800 text-center sm:text-right">
          <p className="font-bold text-xl"> &#8377; {order.finalPrice}</p>
        </div>
  
        {/* Payment Info */}
        <div className="mb-6 text-center sm:text-left text-gray-700">
          <h2 className="font-semibold text-xl flex items-center gap-2 mb-2 text-gray-800">
            <FiCreditCard /> Payment Details
          </h2>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Method:</span> {order.paymentMethod}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={
                  order.paymentStatus === "Paid"
                    ? "text-green-600 font-medium"
                    : "text-yellow-600 font-medium"
                }
              >
                {order.paymentStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">
                {order.paymentMethod === "Cash on Delivery"
                  ? "Note:"
                  : "Transaction ID:"}
              </span>{" "}
              {order.note || order.razorpayOrderId || order._id}
            </p>
          </div>
        </div>
  
        {/* Review form */}
        {showReviewForm && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-md max-w-full">
            <h2 className="text-lg font-semibold mb-4">Leave Your Review</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Review
                </label>
                <textarea
                  className="mt-1 p-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  rows="4"
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
  
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
  
                    const productIds = order.products.map(
                      (item) => item.product._id
                    );
  
                    submitReview(order.user._id, productIds, rating, comment);
                  }}
                >
                  Submit Review and Continue Shopping
                </button>
              </div>
            </form>
          </div>
        )}
  
        {/* Footer */}
        <div className="border-t pt-4 text-center text-sm text-gray-500">
          <p>
            Thank you for shopping with
            <span className="font-semibold text-gray-700"> ElectroEra</span>!
          </p>
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
            <button
              onClick={handleGiveReview}
              className="bg-yellow-500 cursor-pointer text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Give Review
            </button>
            <button
              className="bg-green-600 cursor-pointer text-white py-2 px-4 rounded"
              onClick={downloadInvoice}
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default InvoicePage;
