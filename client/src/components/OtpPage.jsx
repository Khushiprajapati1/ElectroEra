import React, { useState, useRef } from "react";
import { KeyRound } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  //const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //setError("");

    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verifyEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Send cookies for session tracking
          body: JSON.stringify({ code: otpString }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data.redirect) {
          navigate(data.redirect); // Redirect to signup
          toast.error("Incorrect OTP, Enter Credentials Again");
        } else {
          toast(data.message);
        }
      } else {
        toast.success("Email Verified Successfully!");
        navigate("/Login_Form"); // Redirect after success
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gray-900">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="bg-white p-6 rounded-lg shadow-md w-85"
  //     >
  //       <h2 className="text-center text-2xl font-bold mb-4">Enter OTP</h2>

  //       <div className="mb-4 flex justify-between">
  //         {otp.map((digit, index) => (
  //           <input
  //             key={index}
  //             type="text"
  //             value={digit}
  //             onChange={(e) => handleChange(e, index)}
  //             onKeyDown={(e) => handleKeyDown(e, index)}
  //             ref={(el) => (inputRefs.current[index] = el)}
  //             className="border rounded bg-gray-100 w-10 h-12 text-center text-xl"
  //             maxLength="1"
  //             required
  //           />
  //         ))}
  //       </div>
  //       <div className="flex justify-center mt-6">
  //         <button
  //           type="submit"
  //           className={`bg-gray-500 text-white rounded py-2 px-5 ${
  //             loading
  //               ? "opacity-50 cursor-not-allowed"
  //               : "hover:bg-gray-700 cursor-pointer"
  //           }`}
  //           disabled={loading}
  //         >
  //           {loading ? "Verifying..." : "OK"}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-black/80 to-purple-900/90"></div>

      {/* Glass morphism form */}
      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-md bg-black/30 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-lg mx-4 border border-blue-500/20"
      >
        <div className="flex justify-center mb-6">
          <KeyRound className="w-16 h-16 text-blue-400" />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-4">Verify Your Account</h2>
        <p className="text-blue-200/80 text-center mb-8">Enter the verification code we sent to your email</p>

        <div className="flex justify-center gap-3 md:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-14 md:w-14 md:h-16 bg-white/10 border border-blue-500/20 rounded-xl text-center text-2xl text-white focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
              maxLength={1}
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className={`mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </button>

        {/* <p className="mt-6 text-center text-blue-200/60">
          Didn't receive the code? <button type="button" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">Resend</button>
        </p> */}

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full"></div>
        <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-blue-500/20 rounded-full"></div>
      </form>
    </div>
  );
};

export default OtpPage;
