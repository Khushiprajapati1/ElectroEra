import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbSettingsQuestion } from "react-icons/tb";
import {
  FaShoppingCart,
  FaRegUser,
  FaCreditCard,
  FaLock,
  FaCog,
  FaInfoCircle,
  FaClock,
  FaPhoneAlt,
  FaKey,
  FaClipboardList,
  FaRegQuestionCircle,
  FaMapMarkerAlt,
  FaClipboardCheck,
} from "react-icons/fa";
const faqData = [
  {
    question: " I’m new here — how do I get stared?",
    answer:
      " Start by browsing our categories, adding products to your cart and heading to checkout. Need help? Visit our Customer Service section or reach out anytime — we’re happy to guide you!",
    icon: <FaInfoCircle className="text-cyan-600" />,
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse your favorite electronics, add them to your cart, and proceed to checkout. It’s quick and easy!",
    icon: <FaShoppingCart className="text-blue-500" />, // Changed to blue
  },
  {
    question:"How long does delivery take?",
    answer:" Most orders are delivered within 3–7 business days depending on your location. Delivery times are displayed during checkout for your area.",
    icon:<FaClock className="text-yellow-600" /> ,
  },
  {
    question: "How do I create an account on the website?",
    answer:
      "Click on the 'Sign Up' button on the Navigation Bar, enter your details, and you're ready to go.",
    icon: <FaRegUser className="text-yellow-700" />, // Changed to yellow
  },
  {
    question: "What payment options are available?",
    answer:
      "We offer secure payments via RazorPay (net banking) and Cash on Delivery in many regions.",
    icon: <FaCreditCard className="text-purple-500" />, // Changed to purple
  },
  {
    question: "Is my payment and personal information safe?",
    answer:
      "Absolutely! We use end-to-end encryption and never store your sensitive data.",
    icon: <FaLock className="text-red-500" />, // Changed to red
  },
  {
    question: "How do I change my account information?",
    answer:
      "You can update your information by going to your account settings and making changes under 'My Profile'.",
    icon: <FaCog className="text-indigo-500" />, // Changed to indigo
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via the 'Contact Us' page or email us directly at electroera001@gmail.com.",
    icon: <FaPhoneAlt className="text-teal-700" />, // Changed to teal
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "Click on 'Forgot Password' on the login page, enter your email, and follow the instructions to reset your password.",
    icon: <FaKey className="text-orange-500" />, // Changed to orange
  },
  {
    question: "Can I modify my order after it has been placed?",
    answer:
      "Unfortunately, once an order is placed, it cannot be modified. Please contact customer support if you need assistance.",
    icon: <FaClipboardList className="text-blue-600" />, // Changed to lighter blue
  },
  {
    question: "How do I know if an item is in stock?",
    answer:
      "You can check the availability of any item on its product page. If it's out of stock, you can clearly see on Product Page.",
    icon: <FaClipboardCheck className="text-green-500" />, // Changed to green
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer:
      "  If your order hasn’t been shipped yet, you can contact support to update the address. Once shipped, address changes aren't possible.",
    icon:  <FaMapMarkerAlt className="text-pink-600" />, // Changed to indigo light
  },
  {
    question: "What should I do if I receive a damaged item?",
    answer:
      "If you receive a damaged item, please contact our support team immediately with pictures of the damage, and we’ll resolve it as quickly as possible.",
    icon: <FaRegQuestionCircle className="text-red-700" />, // Changed to light red
  },
  {
    question: "How do I know if my payment has been successful?",
    answer:
      "A confirmation pop-up will appear, and an invoice will be generated. You can then download the invoice. Your order has now been successfully processed.",
    icon: <FaCreditCard className="text-purple-600" />, // Changed to lighter purple
  },
];

const faqVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
};

const FAQs = () => {

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="p-6 sm:p-10 bg-gray-800 min-h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-center text-gray-200 mb-8 flex items-center justify-center gap-3"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <TbSettingsQuestion className="text-pink animate-pulse" />
          Frequently Asked Questions
        </motion.h1>

        {/* FAQ List */}
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4 border border-white/10 rounded-xl overflow-hidden bg-gray-200 text-black shadow-lg"
            variants={faqVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Toggle Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                {faq.icon}
                <span className="font-medium text-lg">{faq.question}</span>
              </div>
              {openIndex === index ? (
                <FaChevronUp className="text-black-600" />
              ) : (
                <FaChevronDown className="text-black-600" />
              )}
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="px-6 pb-4 text-gray-800"
                  variants={faqVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQs;
