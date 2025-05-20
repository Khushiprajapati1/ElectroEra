// src/Components/OtpBox.jsx
import React, { useState, useRef } from "react";

const OtpBox = ({ onSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6 || isNaN(otpString)) {
      setError("Please enter a valid 6-digit OTP.");
    } else {
      setError("");
      console.log("OTP submitted:");
      if (onSubmit) onSubmit(otpString);
    }
  };

  const handleResendOtp = () => {
    console.log("OTP resent");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex justify-between mb-1">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="border rounded bg-gray-100 w-10 h-12 text-center text-xl"
            maxLength="1"
            required
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="mt-3 text-center">
        <span
          className="text-blue-500 cursor-pointer hover:underline text-sm"
          onClick={handleResendOtp}
        >
          Resend OTP?
        </span>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-gray-500 text-white rounded py-2 px-5 hover:bg-gray-700"
        >
          OK
        </button>
      </div>
    </form>
  );
};

export default OtpBox;
