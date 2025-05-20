import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

const ForgotPassword = () => {
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
          Having trouble to sign in? <br /> Reset your password.
        </h1>

        {/* <div className="flex items-center justify-center w-full mt-5"> */}
        {/* <Button */}
        {/* // size="small" */}
        {/* // onClick={handleClickGoogle} */}
        {/* // endIcon={<FcGoogle />} */}
        {/* // loading={loadingGoogle} */}
        {/* // loadingPosition="end" */}
        {/* // variant="outlined" */}
        {/* // className="!bg-none !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]" */}
        {/* // > */}
        {/* Signin with Google */}
        {/* </Button> */}
        {/* </div> */}
        <br />

        <form className="w-full px-8">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] bg-gray-100 rounded-md 
              focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
            />
          </div>

          <Button className="btn-blue btn-lg w-full">Reset Password</Button>
          <br/>
          <br/>
          <div className="text-center flex items-center justify-center gap-4 ">
            <span>Don't want to reset?</span>
              <Link
                to="/forgot-password"
                className="text-primary font-[700] text-[15px] hover:underline hover:text-gray-700"
              >
                Sign In
              </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
