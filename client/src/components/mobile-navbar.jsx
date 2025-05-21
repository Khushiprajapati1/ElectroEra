import React from "react";
import { useState } from "react";
import { HiOutlineShoppingBag, HiMenu } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import NavUserIcon from "./NavUserIcon";
import { useAddToCart } from "../store/addtocartcontext";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isACOpen, setIsACOpen] = useState(false);
  const [isFridgeOpen, setIsFridgeOpen] = useState(false);
  const [isTVOpen, setIsTVOpen] = useState(false);
  const [isWashingMachineOpen, setIsWashingMachineOpen] = useState(false);
  const [isKitchenOpen, setIsKitchenOpen] = useState(false);
  const [isEntertainmentOpen, setIsEntertainmentOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { totalCartItems } = useAddToCart();

  return (
    <div className="relative">
      <nav className="flex h-12 items-center justify-between bg-black px-4 text-sm text-white">
        <span className="text-white font-mono text-xl">ElectroEra</span>
        <div className="flex items-center space-x-1">
          {/* <div className="flex items-center">
            <span className="h-6 w-6 text-white">
              <RiSearchLine className="cursor-pointer text-xl font-extrabold text-white/90 hover:text-white" />
            </span>
          </div> */}
          <div className="flex items-center">
            <button className="relative cursor-pointer text-white/90 hover:text-white h-6 w-6">
              <Link to="/Cart">
                <HiOutlineShoppingBag className="text-xl text-white/90 hover:text-white" />
                {totalCartItems > 0 && (
                  <span className="absolute top-[-6px] right-[-10px] flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-black font-bold  shadow-md">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </button>
          </div>
          <div className="flex items-center">
            <span className="h-6 w-6 text-white">
              {/* <HiOutlineUserCircle className="cursor-pointer text-2xl text-white/90 hover:text-white" /> */}
              <NavUserIcon></NavUserIcon>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:opacity-75"
          >
            <HiMenu className="cursor-pointer text-xl text-white/90 hover:text-white" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 right-0 z-40 bg-black text-white transition-all duration-500 ease-in-out ${
          isOpen
            ? "min-h-screen opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-4 p-4">
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsStoreOpen(!isStoreOpen)}
          >
            Store
          </span>
          {/* Store Dropdown Content */}
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isStoreOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">Shop the Latest</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/AC" className="text-white/90 hover:text-white" >
                      AC
                    </Link>
                  </li>
                  <li>
                    <a href="/TV" className="text-white/90 hover:text-white">
                      TV
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Fridge"
                      className="text-white/90 hover:text-white"
                    >
                      Fridge
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 text-xl font-bold">Quick Links</h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/MyProfile"
                      className="text-white/90 hover:text-white"
                    >
                      Profile Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="/OrderHistory"
                      className="text-white/90 hover:text-white"
                    >
                      My Orders
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsACOpen(!isACOpen)}
          >
            AC
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isACOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">
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
                    <Link
                      to="/LG_AC"
                      className="text-white/90 hover:text-white"
                    >
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
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsFridgeOpen(!isFridgeOpen)}
          >
            Refrigerator
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isFridgeOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">Explore all Fridge</h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/Haier_Fridge"
                      className="text-white/90 hover:text-white"
                    >
                      Haier
                    </a>
                  </li>
                  <li>
                    <a
                      href="LG_Fridge"
                      className="text-white/90 hover:text-white"
                    >
                      LG
                    </a>
                  </li>
                  <li>
                    <a
                      href="Samsung_Fridge"
                      className="text-white/90 hover:text-white"
                    >
                      Samsung
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsTVOpen(!isTVOpen)}
          >
            Television
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isTVOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">Explore all TVs</h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/Sony_TV"
                      className="text-white/90 hover:text-white"
                    >
                      Sony
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Samsung_TV"
                      className="text-white/90 hover:text-white"
                    >
                      Samsung
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsWashingMachineOpen(!isWashingMachineOpen)}
          >
            Washing Machine
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isWashingMachineOpen
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">
                  Explore all Washing Machines
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/Samsung_WM"
                      className="text-white/90 hover:text-white"
                    >
                      Samsung
                    </a>
                  </li>
                  <li>
                    <a href="/LG_WM" className="text-white/90 hover:text-white">
                      LG
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Haier_WM"
                      className="text-white/90 hover:text-white"
                    >
                      Haier
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsKitchenOpen(!isKitchenOpen)}
          >
            Kitchen & Home
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isKitchenOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">Kitchen</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/Oven" className="text-white/90 hover:text-white">
                      Oven
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Microwave"
                      className="text-white/90 hover:text-white"
                    >
                      Microwave
                    </a>
                  </li>
                  <li>
                    <a href="/Mixer" className="text-white/90 hover:text-white">
                      Mixer
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Juicer"
                      className="text-white/90 hover:text-white"
                    >
                      Juicer
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Blender"
                      className="text-white/90 hover:text-white"
                    >
                      Blender
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Griller"
                      className="text-white/90 hover:text-white"
                    >
                      Griller / Sandwich Maker
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 text-xl font-bold">Home</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/WM" className="text-white/90 hover:text-white">
                      Washing Machine
                    </a>
                  </li>
                  <li>
                    <a href="/Iron" className="text-white/90 hover:text-white">
                      Iron
                    </a>
                  </li>
                  <li>
                    <a href="/Fan" className="text-white/90 hover:text-white">
                      Fan
                    </a>
                  </li>
                  <li>
                    <a href="Home" className="text-white/90 hover:text-white">
                      Home Theatre
                    </a>
                  </li>
                  <li>
                    <a href="DFM" className="text-white/90 hover:text-white">
                      Domestic flour mill / Atta Chakki
                    </a>
                  </li>
                  <li>
                    <a href="Cooler" className="text-white/90 hover:text-white">
                      Cooler
                    </a>
                  </li>
                  <li>
                    <a href="Geyser" className="text-white/90 hover:text-white">
                      Geyser
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsEntertainmentOpen(!isEntertainmentOpen)}
          >
            Entertainment
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isEntertainmentOpen
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">Explore all</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      TV
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      Home Theatre
                    </a>
                  </li>
                  {/* <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      Mobile
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <span
            className="cursor-pointer text-white/90 hover:text-white"
            onClick={() => setIsSupportOpen(!isSupportOpen)}
          >
            Support
          </span>
          <div
            className={`overflow-hidden bg-black/50 transition-all duration-500 ease-in-out ${
              isSupportOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {/* <div className="grid grid-cols-1 gap-6 p-4">
              <div>
                <h2 className="mb-3 text-xl font-bold">Get Help</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="" className="text-white/90 hover:text-white">
                      Payments
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      Cancellations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/90 hover:text-white">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
