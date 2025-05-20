import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaStore,
  FaBullseye,
  FaGem,
  FaTools,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

function AboutUs() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/images/Shop2.jpg","/images/Shop1.jpg", "/images/Shop3.jpg", "/images/Shop4.jpg", "/images/Shop5.jpg","/images/Shop6.jpg","/images/Shop7.jpg","/images/Shop8.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title Section */}
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <FaBolt className="inline-block mr-2 text-yellow-400" />
          About Us
        </motion.h1>

        {/* Welcome Section */}
        <motion.div
          className="bg-white border-5 border-purple-500 rounded-2xl shadow-lg p-8 space-y-6"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaStore className="text-indigo-500" /> Welcome to ElectroEra!
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            At <b>ElectroEra</b>, we are passionate about providing high-quality
            electronics that meet the needs of our customers. Founded with the
            vision of bringing the latest technology to your doorstep, we have
            become a reliable source for all things electronic in Ahmedabad.
          </p>
          <p className="text-gray-700 text-sm md:text-base mt-4">
            We offer a wide range of electronic appliances, from small gadgets
            to large, all designed to improve your daily life. Whether you're
            looking to upgrade your kitchen with the latest blender or Juicer,
            or you're in need of larger appliances like refrigerators, washing
            machines, or air conditioners, we have it all. Our products are
            carefully selected to ensure they meet the highest standards of
            performance and quality.
          </p>
          <p className="text-gray-700 text-sm md:text-base mt-4">
            With <b>ElectroEra</b>, you can count on finding top-tier home and
            kitchen electronics that help you save time, improve efficiency, and
            enhance your lifestyle.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="bg-white border-5 border-cyan-500 rounded-2xl shadow-lg p-8 space-y-6 mt-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-700 text-sm md:text-base">
            Our mission is to provide high-quality electronic products at
            competitive prices, ensuring that our customers have access to the
            latest technology and exceptional service.
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            We aim to make modern electronics affordable and accessible to every
            household — whether it's a fan for summer, a mixer grinder for your
            kitchen, or a smart TV for your living room. At <b>ElectroEra</b>,
            we believe technology should simplify life, not complicate it.
            That’s why we offer trusted products with honest service, so even
            those unfamiliar with electronics feel confident and satisfied.
          </p>
        </motion.div>

        {/* Image + Who We Are */}
        <motion.div
          className="flex flex-wrap bg-white border-5 border-pink-500 shadow-lg rounded-2xl p-6 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={`ElectroEra ${currentImage + 1}`}
              className="rounded-xl w-full h-85 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Who We Are
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              Welcome to <b>Vimal Electronics</b>, your trusted destination for
              all your electronic needs. Established in 1986, we've proudly
              served the Ahmedabad community with a wide range of home
              appliances and consumer electronics.
            </p>
            <div className="text-sm md:text-base mt-4 space-y-1 text-gray-700">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-red-500" />
                <span>
                  Vimal Electronics, Shop No 3, 2, Vastral Road, Rita Nagar,
                  Amraiwadi, Ahmedabad, Gujarat 382418
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-600" /> +91 93136 91209
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          className="bg-white border-5 border-green-400 rounded-2xl shadow-lg p-8 space-y-6 mt-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Our Products</h2>
          <p className="text-gray-700 text-sm md:text-base">
            At <b>ElectroEra</b>, we offer a wide range of electronic appliances
            for your home and kitchen. Whether you're setting up a new house or
            upgrading old equipment, you'll find Many more you need under one
            roof.
          </p>

          <ul className="text-gray-700 text-sm md:text-base space-y-2 list-disc pl-5">
            <li>LED Televisions</li>
            <li>Refrigerators</li>
            <li>Washing Machines</li>
            <li>Air Conditioners</li>
            <li>Fans & Geysers</li>
            <li>Mixers, Juicers & Blenders</li>
            <li>Aata Chakki (Flour Mill)</li>
            <li>Home Theatres</li>
          </ul>

          <p className="text-gray-700 text-sm md:text-base">
            We proudly deal in top brands trusted by millions:
            <br />
            <b>Sony</b>, <b>Samsung</b>, <b>LG</b>, <b>Haier</b>, <b>Lloyd</b>{" "}
            and many more.
          </p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="bg-white border-l-4 border-fuchsia-500 shadow-lg rounded-2xl p-8 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaTools className="text-green-600" /> Our Core Values
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base">
            <li>
              <b>Customer First:</b> We prioritize satisfaction in everything we
              do.
            </li>
            <li>
              <b>Integrity:</b> We do honest business, always.
            </li>
            <li>
              <b>Innovation:</b> Always up-to-date with the latest tech.
            </li>
            <li>
              <b>Excellence:</b> Top-notch service & product quality.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
