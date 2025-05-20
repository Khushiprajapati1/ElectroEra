import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import NavUserIcon from "./NavUserIcon";
import SearchComponent from "./SearchComponent";
import { useAddToCart } from "../store/addtocartcontext";
import { SearchContext } from "../store/searchContext";
import { BiSolidHomeHeart } from "react-icons/bi";


export default function Navbar() {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isACOpen, setIsACOpen] = useState(false);
  const [isRefrigeratorOpen, setIsRefrigeratorOpen] = useState(false);
  const [isTVOpen, setIsTVOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isKitchenOpen, setIsKitchenOpen] = useState(false);
  const [isEntertainmentOpen, setIsEntertainmentOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { totalCartItems } = useAddToCart();

  // const toggleSearch = () => {
  //   setShowSearch((prev) => !prev);
  // };
  const { isSearchOpen, toggleSearch } = useContext(SearchContext);
  // const { toggleSearch } = useSearch();

  const handleStoreMouseEnter = () => {
    setIsStoreOpen(true);
    setIsACOpen(false);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(false);
    setIsMobileOpen(false);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(false);
  };
  const handleACMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(true);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(false);
    setIsMobileOpen(false);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(false);
  };
  const handleRefrigeratorMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(false);
    setIsRefrigeratorOpen(true);
    setIsTVOpen(false);
    setIsMobileOpen(false);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(false);
  };
  const handleTVMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(false);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(true);
    setIsMobileOpen(false);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(false);
  };
  const handleMobileMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(false);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(false);
    setIsMobileOpen(true);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(false);
  };
  const handleKitchenMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(false);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(false);
    setIsMobileOpen(false);
    setIsKitchenOpen(true);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(false);
  };
  const handleEntertainmentMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(false);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(false);
    setIsMobileOpen(false);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(true);
    setIsSupportOpen(false);
  };
  const handleSupportMouseEnter = () => {
    setIsStoreOpen(false);
    setIsACOpen(false);
    setIsRefrigeratorOpen(false);
    setIsTVOpen(false);
    setIsMobileOpen(false);
    setIsKitchenOpen(false);
    setIsEntertainmentOpen(false);
    setIsSupportOpen(true);
  };

  return (
    <div className="relative">
      <nav className="flex h-12 items-center justify-between bg-black px-4 text-sm text-white">
        <div className="flex flex-1 items-center justify-center gap-8">
          <span className="text-white font-bold text-xl font-mono flex items-center justify-center gap-2"><BiSolidHomeHeart className="text-3xl"/> ElectroEra</span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsStoreOpen(!isStoreOpen)}
            onMouseEnter={handleStoreMouseEnter}
          >
            Store
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsACOpen(!isACOpen)}
            onMouseEnter={handleACMouseEnter}
          >
            AC
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsRefrigeratorOpen(!isRefrigeratorOpen)}
            onMouseEnter={handleRefrigeratorMouseEnter}
          >
            Refrigerator
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsTVOpen(!isTVOpen)}
            onMouseEnter={handleTVMouseEnter}
          >
            Television
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            onMouseEnter={handleMobileMouseEnter}
          >
            Washing Machine
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsKitchenOpen(!isKitchenOpen)}
            onMouseEnter={handleKitchenMouseEnter}
          >
            Kitchen & Home
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsEntertainmentOpen(!isEntertainmentOpen)}
            onMouseEnter={handleEntertainmentMouseEnter}
          >
            Entertainment
          </span>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            onMouseEnter={handleSupportMouseEnter}
          >
            Support
          </span>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={toggleSearch}>
            <RiSearchLine className="text-white text-xl cursor-pointer" />
          </button>
          {/* {showSearch && (
            <div className="absolute top-full left-0 w-full z-50">
              <SearchComponent />
            </div> */}
          {/* )} */}

          <button className="relative cursor-pointer text-white/90 hover:text-white">
            <Link to="/Cart">
              <HiOutlineShoppingBag className="text-xl text-white/90 hover:text-white" />
              {totalCartItems > 0 && (
                <span className="absolute top-[-6px] right-[-10px] flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-black font-bold  shadow-md">
                  {totalCartItems}
                </span>
              )} 
            </Link>
          </button>
          <NavUserIcon></NavUserIcon>
        </div>
      </nav>

      <div
        className={`absolute left-0 right-0 z-50 w-full bg-black bg-opacity-50 backdrop-blur-md transition-all duration-300 ${
          isSearchOpen
            ? "opacity-100 max-h-screen overflow-visible"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <SearchComponent />
      </div>

      {/* Store Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isStoreOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsStoreOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Shop the Latest Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Shop the Latest</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/AC" className="text-white/90 hover:text-white">
                    AC
                  </Link>
                </li>
                <li>
                  <Link to="/TV" className="text-white/90 hover:text-white">
                    TV
                  </Link>
                </li>
                <li>
                  <Link to="/Fridge" className="text-white/90 hover:text-white">
                    Fridge
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="MyProfile"
                    className="text-white/90 hover:text-white"
                  >
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="OrderHistory"
                    className="text-white/90 hover:text-white"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AC Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isACOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsACOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Explore all Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                <Link to="/AC">Explore all ACs</Link>
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/Haier_AC"
                    className="text-white/90 hover:text-white"
                  >
                    Haier
                  </Link>
                </li>
                <li>
                  <Link to="/LG_AC" className="text-white/90 hover:text-white">
                    LG
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Llyod_AC"
                    className="text-white/90 hover:text-white"
                  >
                    Llyod
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Samsung_AC"
                    className="text-white/90 hover:text-white"
                  >
                    Samsung
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* refrigerator Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isRefrigeratorOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsRefrigeratorOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Explore all Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                <Link to="/Fridge">Explore all Fridge</Link>
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/Haier_Fridge"
                    className="text-white/90 hover:text-white"
                  >
                    Haier
                  </Link>
                </li>
                <li>
                  <Link
                    to="/LG_Fridge"
                    className="text-white/90 hover:text-white"
                  >
                    LG
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Samsung_Fridge"
                    className="text-white/90 hover:text-white"
                  >
                    Samsung
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* TV Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isTVOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsTVOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Explore all Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                <Link to="/TV">Explore all TVs</Link>
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/Sony_TV"
                    className="text-white/90 hover:text-white"
                  >
                    Sony
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Samsung_TV"
                    className="text-white/90 hover:text-white"
                  >
                    Samsung
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Washing Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isMobileOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsMobileOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Explore all Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                <Link to="/WM">Explore all Washing Machines</Link>
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/Samsung_WM"
                    className="text-white/90 hover:text-white"
                  >
                    Samsung
                  </Link>
                </li>
                <li>
                  <Link to="/LG_WM" className="text-white/90 hover:text-white">
                    LG
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Haier_WM"
                    className="text-white/90 hover:text-white"
                  >
                    Haier
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen and Home Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isKitchenOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsKitchenOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* kitchen Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Kitchen</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/Oven" className="text-white/90 hover:text-white">
                    Oven
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Microwave"
                    className="text-white/90 hover:text-white"
                  >
                    Microwave
                  </Link>
                </li>
                <li>
                  <Link to="/Mixer" className="text-white/90 hover:text-white">
                    Mixer
                  </Link>
                </li>
                <li>
                  <Link to="/Juicer" className="text-white/90 hover:text-white">
                    Juicer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Blender"
                    className="text-white/90 hover:text-white"
                  >
                    Blender
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Griller"
                    className="text-white/90 hover:text-white"
                  >
                    Griller / Sandwich Maker
                  </Link>
                </li>
              </ul>
            </div>

            {/* Home Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Home</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/WM" className="text-white/90 hover:text-white">
                    Washing Machine
                  </Link>
                </li>
                <li>
                  <Link to="/Iron" className="text-white/90 hover:text-white">
                    Iron
                  </Link>
                </li>
                <li>
                  <Link to="/Fan" className="text-white/90 hover:text-white">
                    Fan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Home_Theatre"
                    className="text-white/90 hover:text-white"
                  >
                    Home Theatre
                  </Link>
                </li>
                <li>
                  <Link to="/DFM" className="text-white/90 hover:text-white">
                    Domestic flour mill / Atta Chakki
                  </Link>
                </li>
                <li>
                  <Link to="/Cooler" className="text-white/90 hover:text-white">
                    Cooler
                  </Link>
                </li>
                <li>
                  <Link to="/Geyser" className="text-white/90 hover:text-white">
                    Geyser
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Entertainment Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isEntertainmentOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsEntertainmentOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Explore all Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Explore all</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/TV" className="text-white/90 hover:text-white">
                    TV
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Home_Theatre"
                    className="text-white/90 hover:text-white"
                  >
                    Home Theatre
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Support Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 bg-black text-white transition-all duration-500 ease-in-out ${
          isSupportOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        onMouseLeave={() => setIsSupportOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-52 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Get help Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                <Link to="GetHelp">Get Help</Link>
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="Payments"
                    className="text-white/90 hover:text-white"
                  >
                    Payments
                  </Link>
                </li>
                {/* <li>
                  <a href="#" className="text-white/90 hover:text-white">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/90 hover:text-white">
                    Cancellations
                  </a>
                </li> */}
                <li>
                  <Link to="FAQs" className="text-white/90 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="AboutUs" className="text-white/90 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="ContactUs"
                    className="text-white/90 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
