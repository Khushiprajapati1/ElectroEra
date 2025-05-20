import React, { createContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//import AppNavbar from "./components/app-navbar";
import HomePage from "./components/homePage";
import ACproducts from "./components/ACproducts";
import HaierAC from "./components/HaierAC";
import LgAC from "./components/LgAC";
import LlyodAC from "./components/LlyodAC";
import SamsungAC from "./components/SamsungAC";
import FridgeProducts from "./components/FridgeProducts";
import HaierFridge from "./components/HaierFridge";
import LgFridge from "./components/LgFridge";
import SamsungFridge from "./components/SamsungFridge";
import TVProducts from "./components/TVProducts";
import SonyTV from "./components/SonyTV";
import SamsungTV from "./components/SamsungTV";
import WMProducts from "./components/WMProducts";
import SamsungWMProducts from "./components/SamsungWM";
import LGWMProducts from "./components/LgWM";
import HaierWMProducts from "./components/HaierWM";
import OvenProducts from "./components/OvenProducts";
import MCProducts from "./components/MCProducts";
import MixerProducts from "./components/MixerProducts";
import JuicerProducts from "./components/JuicerProduct";
import BlenderProducts from "./components/BlenderProducts";
import GrillerProducts from "./components/GrillerProducts";
import IronProducts from "./components/IronProducts";
import FanProducts from "./components/FanProducts";
import HTProducts from "./components/HTProducts";
import DFMProducts from "./components/DFMProducts";
import CoolerProducts from "./components/CoolerProducts";
import GeyserProducts from "./components/GeyserProduts";
import ProductPage from "./components/ProductPage";
import Cart from "./components/CartItem";
import WishList from "./components/WishList";
import InvoicePage from "./components/InvoicePage";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import MyProfilePage from "./components/MyProfilePage";
import CustomerService from "./components/CustomerService";
import Support from "./components/Support";
import FAQs from "./components/FAQs";
import ContactUs from "./components/ContactUs";
import GetHelp from "./components/GetHelp";
import Payments from "./components/Payments";
import AboutUs from "./components/AboutUs";
import AllProducts from "./components/AllProducts";

import LoginOrSignin from "./components/LoginOrSignin";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import ForgotPasswordEmail from "./components/FP_email";
import ChangePassword from "./components/changePassword";
import OtpPage from "./components/OtpPage";
import { LogOut } from "./components/LogOut";
//import Footer from "./components/footer";
import MainLayout from "./components/MainLayout";

// Admin Panel
import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
// import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";
import SignUpForm from "./Pages/SignUp";
import Products from "./Pages/Products";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddProduct from "./Pages/Products/addProduct";
import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
import CategoryList from "./Pages/Category";
import AddCategory from "./Pages/Category/addCategory";
import SubCategoryList from "./Pages/Category/subCatList";
import AddSubCategory from "./Pages/Category/addSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import Reviews from "./Pages/Reviews";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePasswordForm from "./Pages/ChangePassword";
import DashboardLayout from "./components/DashBoardLayout";

// MUI Dialog
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { IoMdClose } from "react-icons/io";

// Styles
import "./App.css";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
  });
  
  

  

  const values = {
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
  };

  return (
    <MyContext.Provider value={values}>
      {/* <AppNavbar /> */}

      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/AC" element={<ACproducts />} />
        <Route path="/Haier_AC" element={<HaierAC />} />
        <Route path="/LG_AC" element={<LgAC />} />
        <Route path="/Llyod_AC" element={<LlyodAC />} />
        <Route path="/Samsung_AC" element={<SamsungAC />} />
        <Route path="/Fridge" element={<FridgeProducts />} />
        <Route path="/Haier_Fridge" element={<HaierFridge />} />
        <Route path="/LG_Fridge" element={<LgFridge />} />
        <Route path="/Samsung_Fridge" element={<SamsungFridge />} />
        <Route path="/TV" element={<TVProducts />} />
        <Route path="/Sony_TV" element={<SonyTV />} />
        <Route path="/Samsung_TV" element={<SamsungTV />} />
        <Route path="/WM" element={<WMProducts />} />
        <Route path="/Haier_WM" element={<HaierWMProducts />} />
        <Route path="/LG_WM" element={<LGWMProducts />} />
        <Route path="/Samsung_WM" element={<SamsungWMProducts />} />
        <Route path="/Oven" element={<OvenProducts />} />
        <Route path="/Microwave" element={<MCProducts />} />
        <Route path="/Mixer" element={<MixerProducts />} />
        <Route path="/Juicer" element={<JuicerProducts />} />
        <Route path="/Blender" element={<BlenderProducts />} />
        <Route path="/Griller" element={<GrillerProducts />} />
        <Route path="/Iron" element={<IronProducts />} />
        <Route path="/Fan" element={<FanProducts />} />
        <Route path="/Home_Theatre" element={<HTProducts />} />
        <Route path="/DFM" element={<DFMProducts />} />
        <Route path="/Cooler" element={<CoolerProducts />} />
        <Route path="/Geyser" element={<GeyserProducts />} />
        <Route path="/Product" element={<ProductPage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/WishList" element={<WishList />} />
        <Route path="/Invoice" element={<InvoicePage />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/edit-address" element={<Checkout />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/MyProfile" element={<MyProfilePage />} />
        <Route path="/CustomerService" element={<CustomerService />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/GetHelp" element={<GetHelp />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/AllProducts" element={<AllProducts />} />



        



        

        {/* Auth */}
        <Route path="/Login_OR_Signup" element={<LoginOrSignin />} />
        <Route path="/Login_Form" element={<LoginForm />} />
        <Route path="/Signup_Form" element={<SignUp />} />
        <Route path="/ForgotPassword_email" element={<ForgotPasswordEmail />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/OTP_Page" element={<OtpPage />} />
        <Route path="/logout" element={<LogOut />} />
        </Route>

        {/* Admin */}
        {/* <Route
          path="/dashboard"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <Dashboard />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route
          path="/products"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <Products />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/homeSlider/list"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <HomeSliderBanners />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/category/list"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <CategoryList />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/subCategory/list"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <SubCategoryList />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <Users />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/orders"
          element={
            <div className="main">
              <Header />
              <div className="contentMain flex">
                <div className="sidebarWrapper w-[18%]">
                  <Sidebar />
                </div>
                <div className="contentRight py-4 px-5 w-[82%]">
                  <Orders />
                </div>
              </div>
            </div>
          }
        /> */}
        <Route path="/dashboard" element={
        <DashboardLayout><Dashboard /></DashboardLayout>
      } />
      <Route path="/products" element={
        <DashboardLayout><Products /></DashboardLayout>
      } />
      <Route path="/homeSlider/list" element={
        <DashboardLayout><HomeSliderBanners /></DashboardLayout>
      } />
      <Route path="/category/list" element={
        <DashboardLayout><CategoryList /></DashboardLayout>
      } />
      <Route path="/subCategory/list" element={
        <DashboardLayout><SubCategoryList /></DashboardLayout>
      } />
      <Route path="/users" element={
        <DashboardLayout><Users /></DashboardLayout>
      } />
      <Route path="/orders" element={
        <DashboardLayout><Orders /></DashboardLayout>
      } />
      <Route path="/Reviews" element={
        <DashboardLayout><Reviews /></DashboardLayout>
      } />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/change-password" element={<ChangePasswordForm />} />
      </Routes>

      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => setIsOpenFullScreenPanel({ open: false })}
        TransitionComponent={Transition}
        disableEnforceFocus
  disableRestoreFocus
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenFullScreenPanel({ open: false })}
              aria-label="close"
            >
              <IoMdClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">{isOpenFullScreenPanel?.model}</span>
            </Typography>
          </Toolbar>
        </AppBar>

        {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
        {isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />}
        {isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />}
        {isOpenFullScreenPanel?.model === "Add New SubCategory" && <AddSubCategory />}
      </Dialog>

      {/* <Footer /> */}
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };

