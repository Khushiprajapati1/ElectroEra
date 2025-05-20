// components/MainLayout.jsx
import React from "react";
import AppNavbar from "../components/app-navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <AppNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
