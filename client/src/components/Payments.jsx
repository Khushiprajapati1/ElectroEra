import React from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaCashRegister,
  FaLock,
} from "react-icons/fa";

const Payments = () => {
  return (
    <motion.div
      className="p-6 sm:p-10 bg-gray-900 text-white w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Title Section */}
      <div className="mb-10 text-center">
        <motion.h1
          className="text-4xl font-bold flex justify-center items-center gap-3 text-gray-200"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        >
          <FaMoneyBillWave />
          Payment Options
        </motion.h1>
        <motion.p
          className="text-white/70 mt-3 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Choose a convenient and secure way to pay for your electronic
          products.
        </motion.p>
      </div>

      {/* COD Section - Card Left, Image Right */}
      <div className="flex flex-col lg:flex-row items-center lg:gap-x-10 gap-y-6 mb-12">
        {/* Card */}
        <motion.div
          className="relative bg-gray-200 p-6 rounded-xl shadow-lg w-full lg:w-280 hover:scale-[1.02] hover:shadow-xl transition-all"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
        >
          {/* Popular Choice Tag */}
          <span className="absolute top-4 right-4 bg-yellow-300 text-black text-xs font-semibold px-2 py-1 rounded">
            Popular Choice
          </span>

          <div className="flex items-center gap-4 mb-4">
            <FaCashRegister className="text-3xl text-yellow-500" />
            <div>
              <h2 className="text-2xl font-semibold text-black">
                Cash on Delivery
              </h2>
              <p className="text-sm text-black/100">
                Trusted by thousands of customers!
              </p>
            </div>
          </div>

          <p className="text-black/90 mb-3">
            With COD, pay in cash when the item is delivered to your doorstep —
            no cards, no online hassles.
          </p>

          <ul className="text-black/80 list-disc ml-5 space-y-1 mb-3">
            <li>Ideal for customers who prefer in-person payments.</li>
            <li>Simple, safe, and no digital steps involved.</li>
            <li>No extra fees — just pay what you see.</li>
            <li>No need to share bank or card details.</li>
          </ul>

          <div className="text-sm text-black/70 italic">
            Available in most regions — even remote or rural delivery zones.
          </div>
        </motion.div>

        {/* Image Right */}
        <motion.div
          className="relative w-full lg:w-1/3 h-64 rounded-xl overflow-hidden group"
          initial={{ opacity: 0, scale: 0.95, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
            type: "spring",
            stiffness: 80,
          }}
        >

          {/* Image */}
          <img
            src="/images/COD.jpg"
            alt="Cash on Delivery"
            className="relative z-10 w-full h-full rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </motion.div>
      </div>

      {/* Razorpay Section - Image Left, Card Right */}
      <div className="flex flex-col lg:flex-row-reverse items-center lg:gap-x-10 gap-y-6">
        {/* Card */}
        <motion.div
          className="relative bg-gray-200 p-6 rounded-xl shadow-lg w-full lg:w-280 hover:scale-[1.02] hover:shadow-xl transition-all"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.6 }}
        >
          {/* Tag */}
          <span className="absolute top-4 right-4 bg-blue-400 text-black text-xs font-semibold px-2 py-1 rounded">
            Recommended for Online Users
          </span>

          <div className="flex items-center gap-4 mb-4">
            <FaCreditCard className="text-3xl text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold text-black">
                Online Payment (Razorpay)
              </h2>
              <p className="text-sm text-black/100">
                Fast & Secure Digital Payments
              </p>
            </div>
          </div>

          <p className="text-black/90 mb-3">
            Make instant payments using Razorpay — supports UPI, debit/credit
            cards, net banking & wallets.
          </p>

          <ul className="text-black/80 list-disc ml-5 space-y-1 mb-3">
            <li>Real-time alerts & secure encryption.</li>
            <li>Works with all major Indian banks & apps.</li>
            <li>No hidden fees or charges — ever.</li>
            <li>Instant confirmation and invoice via email/SMS.</li>
          </ul>

          <div className="text-sm text-black/70 italic">
            Great for users who prefer fast, cashless experiences.
          </div>
        </motion.div>

        {/* Image Left with animation and border effect */}
        <motion.div
          className="relative w-full lg:w-1/3 h-64 rounded-xl overflow-hidden group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            type: "spring",
            stiffness: 80,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 opacity-30 blur-lg z-0 animate-pulse rounded-xl" />
          <img
            src="/images/razorPay.jpg"
            alt="Razorpay Payment"
            className="relative z-10 w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        className="mt-10 text-center text-sm text-white/60"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <FaLock className="inline-block text-yellow-300 mr-2 animate-pulse" />
        All transactions are encrypted & securely processed.
      </motion.div>
    </motion.div>
  );
};

export default Payments;
