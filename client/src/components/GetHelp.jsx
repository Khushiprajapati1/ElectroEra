import React from "react";
import { motion } from "framer-motion";
import { LuBadgeHelp } from "react-icons/lu";


const GetHelp = () => {
  return (
    <motion.div
      className="p-6 sm:p-10 bg-gray-900 text-white w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Title */}
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-bold text-gray-200 flex justify-center items-center gap-3"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        >
          <LuBadgeHelp />
          Get Help
        </motion.h1>
        <motion.p
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Need assistance? Explore our support topics or contact us directly.
        </motion.p>
      </div>

      {/* Help Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Payments */}
        <motion.div
          className="bg-gray-200 p-8 rounded-xl shadow-xl hover:scale-105 transition-all"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/Payment.jpg"
              Alt="Payment"
              className="h-12 w-12 mix-blend-darken"
            />
            <motion.h2 className="text-2xl font-semibold text-black">
              Payments
            </motion.h2>
          </div>
          <p className="text-black">
            Learn how to complete a payment securely using your preferred
            method. We cover cash on delivery, online transactions using
            RazorPay, and troubleshooting failed payments. Also understand how
            billing works and get answers to payment-related questions.
          </p>
        </motion.div>

        {/* Account & Login */}
        <motion.div
          className="bg-gray-200 p-8 rounded-xl shadow-xl hover:scale-105 transition-all"
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/AccountLogin.jpg"
              Alt="Payment"
              className="h-12 w-12 mix-blend-darken"
            />
            <motion.h2 className="text-2xl font-semibold text-black">
              Account & Login
            </motion.h2>
          </div>
          <p className="text-black">
            Having trouble signing in or managing your account? We’ll help you
            with password resets, account creation, and updating your personal
            details. Stay secure and in control of your shopping profile.
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          className="bg-gray-200 p-8 rounded-xl shadow-xl hover:scale-105 transition-all"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/FAQ.jpg"
              Alt="Payment"
              className="h-12 w-12 mix-blend-darken"
            />
            <motion.h2 className="text-2xl font-semibold text-black">
              FAQs
            </motion.h2>
          </div>
          <p className="text-black">
            Have a quick question? Our FAQs cover everything from placing
            orders, understanding delivery times, payments and more. Get answers
            without waiting for support.
          </p>
        </motion.div>

        {/* Order Guide */}
        <motion.div
          className="bg-gray-200 p-12 rounded-xl shadow-xl hover:scale-105 transition-all"
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/OrderGuide.jpg"
              Alt="Payment"
              className="h-12 w-14 mix-blend-darken"
            />
            <motion.h2 className="text-2xl font-semibold text-black">
              Order Guide
            </motion.h2>
          </div>
          <p className="text-black">
            Learn how to place an order step-by-step, from selecting a product
            to confirming checkout. We also guide you through all Purchase
            Activities.
          </p>
        </motion.div>

        {/* Product Information */}
        <motion.div
          className="bg-gray-200 p-8 rounded-xl shadow-xl hover:scale-105 transition-all"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/ProductInfo.jpg"
              Alt="Payment"
              className="h-12 w-12 mix-blend-darken"
            />
            <motion.h2 className="text-2xl font-semibold text-black">
              Product Information
            </motion.h2>
          </div>
          <p className="text-black">
            Need help understanding a product’s features or specifications? We
            guide you through reading product descriptions, comparing items, and
            choosing what suits you best.
          </p>
        </motion.div>

        {/* Browsing & Categories */}
        <motion.div
          className="bg-gray-200 p-8 rounded-xl shadow-xl hover:scale-105 transition-all"
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/Browsing.jpg"
              Alt="Payment"
              className="h-12 w-12 mix-blend-darken"
            />
            <motion.h2 className="text-2xl font-semibold text-black">
              Browsing & Categories
            </motion.h2>
          </div>
          <p className="text-black">
            Learn how to explore our store with ease. Discover how to browse by
            categories, filter products, and use the search bar to find what
            you’re looking for faster.
          </p>
        </motion.div>
      </div>

      {/* Contact Us */}
      <motion.div
        className="mt-12 bg-gray-200 p-7 rounded-xl shadow-xl hover:scale-105 transition-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/images/Contact.jpg"
            Alt="Payment"
            className="h-12 w-12 mix-blend-darken"
          />
          <motion.h2 className="text-2xl font-semibold text-black">
            Contact Us
          </motion.h2>
        </div>
        <p className="text-black">
          Still have questions or need personal support? We're here to help!
          Reach out to our dedicated customer care team via phone, email, or
          live chat — whatever suits you best. Whether it's a product inquiry, a
          payment issue, or something else, we’re always happy to assist.<br/> Our
          team is available every day from 10 AM to 9 PM to ensure your shopping
          experience remains smooth. <br/>Your satisfaction is our top priority —
          don’t hesitate to get in touch.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default GetHelp;
