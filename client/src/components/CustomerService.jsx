import React from "react";
import {
    FaUserShield,
    FaCreditCard,
    FaInfoCircle,
    FaListOl,
    FaLock, 
  } from "react-icons/fa";
  import { FaCartShopping } from "react-icons/fa6";
  import { MdManageAccounts } from "react-icons/md";
  
  function CustomerService() {
    return (
      <div className="bg-gradient-to-b from-gray-200 to-gray-300 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-3">
              <FaUserShield className="text-blue-800" />
              Customer Service
            </h1>
            <p className="text-gray-600 mt-3 text-sm md:text-base">
              We're here to support your shopping experience. Explore the help sections below.
            </p>
          </div>
  
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Inquiry */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-2xl transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaInfoCircle className="text-indigo-500 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">Product Inquiries</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>View detailed specs on product pages.</li>
                <li>Check availability from the stock section.</li>
                <li>Standard warranties mentioned under product info.</li>
                <li>Read user reviews and suggestions before purchasing.</li>
              </ul>
            </div>
  
            {/* Payment Help */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-green-600 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">Payment Assistance</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Supports Razorpay (UPI, Card, Wallets).</li>
                <li>Cash on Delivery available in selected areas.</li>
                <li>Retry failed transactions safely.</li>
                <li>No hidden charges or payment fees.</li>
              </ul>
            </div>
  
            {/* How to Order */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaListOl className="text-orange-500 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">How to Order</h2>
              </div>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                <li>Browse or search for items.</li>
                <li>Click “Add to Cart.”</li>
                <li>Visit cart and confirm your products.</li>
                <li>Fill in your address and delivery details.</li>
                <li>Select payment method and place order.</li>
              </ol>
            </div>
  
            {/* Account Help */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MdManageAccounts className="text-blue-500 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">Account Assistance</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Use “Forgot Password” to reset login info.</li>
                <li>Edit address in your profile section.</li>
                <li>Verify email for new registrations.</li>
                <li>Your privacy is our priority.</li>
              </ul>
            </div>
  
            {/* Security & Privacy */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-purple-600 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">Security & Privacy</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>All data is encrypted using industry standards.</li>
                <li>We never share your personal information without consent.</li>
                <li>Secure checkout and login processes.</li>
                <li>Compliant with data protection laws.</li>
              </ul>
            </div>
  
            {/* Shopping Rules */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaCartShopping className="text-pink-600 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">Shopping Rules</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Please double-check your cart before placing orders.</li>
                <li>Use real and accurate address details for delivery.</li>
                <li>Respect fair usage of discount codes and offers.</li>
                <li>Contact support for order issues within 7 days.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CustomerService;
  