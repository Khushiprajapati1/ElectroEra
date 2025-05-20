import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddToCartProvider } from "./store/addtocartcontext.jsx";
import { WishlistProvider } from "./store/wishlistContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "./store/order-context.jsx";
import { SearchProvider } from "./store/searchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddToCartProvider>
          <WishlistProvider>
            <OrderProvider>
              <SearchProvider>
                <App />
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </SearchProvider>
            </OrderProvider>
          </WishlistProvider>
        </AddToCartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
