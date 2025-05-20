import React from 'react';
import Navbar from "./navbar";
import MobileNavbar from "./mobile-navbar";

export default function AppNavbar() {
  return (
    <>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </>
  );
}
