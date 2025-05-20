import React from "react";
import { FaPhoneAlt, FaEnvelope, FaTools } from "react-icons/fa";
import { IoMdFlower } from "react-icons/io";

function Support() {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-300 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-3">
            <FaTools className="text-blue-600" />
            Support Center
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Facing issues with orders, payments, or your account? Find quick
            help below or reach out to our team.
          </p>
        </div>

        {/* Quick Help Guide */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Need a Hand? We're Here for You.
          </h2>
          <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
            <div className="flex items-start gap-2">
              <IoMdFlower className="text-pink-500 text-[15px] mt-1" />
              <p>
                Whether you're browsing for the first time or already placed an
                order — we’ve got your back.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <IoMdFlower className="text-pink-500 text-[24px] mt-1" />
              <p>
                Not sure how to track your order or make changes? No worries!
                Our team is just a call or email away to assist you with
                anything — from updating your details to guiding you through a
                return.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <IoMdFlower className="text-pink-500 text-[18px] mt-1" />
              <p>
                We’re dedicated to making your shopping journey smooth and
                enjoyable. If something’s unclear, just ask. We’re happy to help
                you, anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <FaPhoneAlt className="text-blue-600 text-3xl mb-2 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
            <p className="text-sm text-gray-600 mt-1">+91 9876543210</p>
            <p className="text-xs text-gray-500">Mon–Sun, 10 AM to 7 PM</p>
          </div>

          {/* Email */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <FaEnvelope className="text-green-600 text-3xl mb-2 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            <p className="text-sm text-gray-600 mt-1">
              electroera001@gmail.com
            </p>
            <p className="text-xs text-gray-500">Replies within 24–48 hours</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Support;
