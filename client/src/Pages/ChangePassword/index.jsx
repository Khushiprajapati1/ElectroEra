import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const ChangePassword = () => {
  return (
    <section className=" bg-white w-full">
      <header className="w-full fixed top-0 left-0 px-4 py-2 flex items-center justify-between z-50">
        <Link to="/" className="flex items-center">
          <img
            src="ElectroEra_logo.png"
            className="w-[70px] h-[70px] inline-block"
            alt="ElectroEra Logo"
          />
          <span className="text-2xl font-extrabold font-sans ml-3">
            ElectroEra
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/login"  className={({ isActive }) => (isActive ? 'active' : '')}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-3 flex gap-1">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>
          <NavLink to="/sign-up"  className={({ isActive }) => (isActive ? 'active' : '')}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-3 flex gap-1">
              <FaRegUser className="text-[15px]" />
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img src="pattern.jpg" className="w-full fixed top-0 left-0 " />

      <div className="loginBox card w-[40%] h-[auto] pb-25 mx-auto mt-20 relative z-50">
        <h1 className="text-center text-[35px] font-[800]">
          Welcome Back!
          <br />
          You can change your  <br/> password from here
        </h1>

        <br />

        <form className="w-full px-8 mt-3">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
            <div className="relative w-full">
              <input
                type="password"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md 
              focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              />
            </div>
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Confirm Password</h4>
            <div className="relative w-full">
              <input
                type="password"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
      focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              />
            </div>
          </div>

          <Button className="btn-blue btn-lg w-full">Change Password</Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
