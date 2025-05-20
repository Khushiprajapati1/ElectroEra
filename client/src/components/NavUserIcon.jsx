import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GoSignIn } from "react-icons/go";

const NavUserIcon = () => {
  const { user,isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // console.log(option);
    setIsOpen(false); // Close dropdown after selection
    //toggleDropdown();
  };

  

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-5">
        <button
          onClick={toggleDropdown}
          className="cursor-pointer text-white/90 hover:text-white"
        >
          <HiOutlineUserCircle className="text-2xl text-white/90 hover:text-white" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-5 w-65 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {isLoggedIn ? (
              <button className="block px-8 py-3 text-lg text-white-700 hover:bg-gray-700 w-full text-left " onClick={()=>handleOptionClick("Logout")}>
                <Link to="/logout" className="flex items-center gap-2"><MdLogout  className="text-2xl"/>Logout </Link>
              </button>
            ) : (
              <button className="block px-8 py-3 text-lg text-white-700 hover:bg-gray-700 w-full text-left" onClick={()=>handleOptionClick("Sign Up/Login")}>
                <Link to="/Login_OR_Signup" className="flex items-center gap-2"><GoSignIn className="text-2xl font-extrabold"/>Sign Up/Login</Link>
              </button>
            )}

            <Link to="MyProfile"
              onClick={() => handleOptionClick("My Profile")}
              className="flex items-center gap-2 px-8 py-3 text-lg text-white-700 hover:bg-gray-700 w-full text-left"
            ><FaRegUser className="text-2xl" />
              My Profile
            </Link>
            <Link to="/OrderHistory"
              onClick={() => handleOptionClick("Order History")}
              className="flex items-center gap-2 px-8 py-3 text-lg text-white-700 hover:bg-gray-700 w-full text-left"
            ><MdHistory className="text-2xl" />
              Order History
            </Link>
            <Link to="/WishList"
              onClick={() => handleOptionClick("Wishlist")}
              className="flex items-center gap-2 px-8 py-3 text-lg text-white-700 hover:bg-gray-700 w-full text-left"
            ><FaRegHeart className="text-2xl"/>
              Wishlist
            </Link>
            {user?.isAdmin && (
              <button
                onClick={() => handleOptionClick("Admin Panel")}
                className="block px-8 py-3 text-lg text-white-700 w-full hover:bg-gray-700 text-left"
              >
                <Link to="/dashboard" className="flex items-center gap-2"><MdOutlineAdminPanelSettings className="text-3xl" />Visit Admin Panel</Link>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavUserIcon;
