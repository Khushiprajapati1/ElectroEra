import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FcBusinessContact } from "react-icons/fc";
import { motion } from "framer-motion"; // Import motion from framer-motion

function ContactUs() {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [showMap, setShowMap] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const mapVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    
    <div className="bg-gray-800 min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-gray-200 mb-10 text-center flex items-center justify-center gap-3"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <FcBusinessContact className="text-[40px]" />
          Contact Us
        </motion.h1>

        <motion.div
          className="bg-white border border-gray-300 rounded-2xl shadow-lg p-8 space-y-6"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {/* Phone Support */}
          <motion.div
            className="flex items-start gap-4"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <FaPhoneAlt className="text-green-600 text-xl mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Phone Support</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Call us at <b>+91 93136 91209</b> 
              </p>
            </div>
          </motion.div>

          {/* Email Support */}
          <motion.div
            className="flex items-start gap-4"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <FaEnvelope className="text-blue-600 text-xl mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Email Support</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Send us your queries anytime at <b>electroera001@gmail.com</b>
              </p>
            </div>
          </motion.div>

          {/* Office Location with toggleable Map */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-pink-600 text-xl mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Our Shops</h2>
                <p className="text-gray-700 text-sm md:text-base">
                  <b>Shop Name:</b> Vimal Electronics
                  <br />
                  <b>Shop Address:</b> Shop No. 3/2 Bhagat Nagar, Near Sureliya
                  Estate,
                  <br />
                  Vastral road, Amraiwadi, Ahmedabad, Gujarat-380026.
                </p>

                {/* Button to toggle map */}
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-pink-500 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-50 hover:shadow-md transition duration-200"
                >
                  <FaMapMarkedAlt className="text-pink-500" />
                  {showMap ? "Hide Map" : "Show Location on Map"}
                </button>
              </div>
            </div>

            {/* Conditional Map Display with Framer Motion animation */}
            {showMap && (
              <motion.div
                className="w-full h-64 rounded-xl overflow-hidden shadow border"
                initial="hidden"
                animate="visible"
                variants={mapVariants}
              >
                <iframe
                  title="Vimal Electronics Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1006.6045166352376!2d72.64084970487545!3d23.004739786608365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8641a8219a3d%3A0xe9e48aedc6aa8074!2sVimal%20Electronics%20-%20Best%20Electronics%20Shop%20in%20Ahmedabad!5e0!3m2!1sen!2sin!4v1744290506211!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            )}
          </motion.div>

          {/* Working Hours */}
          <motion.div
            className="flex items-start gap-4"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <FaClock className="text-purple-600 text-xl mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Working Hours</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Monday to Sunday: 10:00 AM – 9:00 PM
              </p>
            </div>
          </motion.div>

          <div className="text-center pt-6">
            <p className="text-sm text-gray-600">
              We’re always happy to assist you. Whether you have questions about
              your order, our policies, or need help with a product — just reach
              out!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactUs;
