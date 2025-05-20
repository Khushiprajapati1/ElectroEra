import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          "https://electroera.onrender.com/api/wishlist/getWishlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userId }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          setWishlist(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  const toggleWishlist = async (productId) => {
    try {
      const response = await fetch(
        "https://electroera.onrender.com/api/wishlist/toggleWishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: productId, user: userId }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        if (data.message.includes("Added")) {
            // Add product manually (you need the product details here)
            setWishlist(prev => [...prev, { product: { _id: productId } }]);
          } else {
            // Remove from wishlist
            setWishlist(prev => prev.filter(item => item.product._id !== productId));
          }

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use context
export const useWishlist = () => {
  return useContext(WishlistContext);
};
