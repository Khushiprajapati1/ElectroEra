import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import OtpBox from "../../components/OtpBox";

const VerifyAccount = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpSubmit = (code) => {
    // console.log("Verified OTP:", code);
    // Handle API submission here if needed
  };

  return (
    <section className="relative w-full min-h-screen bg-white">
      {/* Background Pattern */}
      <img
        src="pattern.jpg"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Header */}
      <header className="w-full fixed top-0 left-0 px-4 py-2 flex items-center justify-between z-10 bg-white/80 shadow">
        <Link to="/" className="flex items-center">
          <img
            src="ElectroEra_logo.png"
            className="w-[70px] h-[70px]"
            alt="ElectroEra Logo"
          />
          <span className="text-2xl font-extrabold font-sans ml-3">
            ElectroEra
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/login">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-3 flex gap-1">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-3 flex gap-1">
              <FaRegUser className="text-[15px]" />
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>

      {/* Card Container */}
      <div className="relative z-20 pt-28 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-[90%] max-w-md text-center">
          <img
            src="/OTPV.jpg"
            alt="OTP Visual"
            className="w-[100px] mx-auto mix-blend-darken mb-4"
          />
          <h1 className="text-[28px] font-bold mb-2">
            Welcome Back! <br />
            Please Verify Your Account
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            OTP sent to <span className="text-primary font-semibold">abc@gmail.com</span>
          </p>

          {/* OTP Box Inside the Card */}
          <OtpBox onSubmit={handleOtpSubmit} />
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
