import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddToCartContext = createContext();

export const AddToCartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const addCart = async (product, userId, quantity) => {
    // if (userId === null) {
    //   // alert("login first");
    //   return false;
    // }
    //console.log(product, userId, quantity)
    //console.log(product.price)

    const cartData = {
      quantity, 
      product,
      user: userId,
      totalPrice: parseInt(Number(product?.price.replace(/,/g, "")) * quantity),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/cart/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Product Added to the Cart");
        navigate("/Cart");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.log("Add To Cart", error);
    }
  };

  const fetchCart = async (userId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId }),
      });
      const data = await response.json();

      if (response.ok) {
        setCartItems(data.message);
        setTotalCartItems(data.message.length);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromCart = async (userId,cartId,productId)=>{
    try {

      //console.log(userId,productId)

      const response = await fetch("http://localhost:5000/api/cart/removeItemFromCart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user:userId,_id:cartId,product:productId }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Product Removed From Cart")
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {

      console.log(error);
      
    }
  }
  

  return (
    <AddToCartContext.Provider
      value={{ addCart, fetchCart, cartItems, totalCartItems ,deleteFromCart}}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

// Custom hook for using the context
export const useAddToCart = () => useContext(AddToCartContext);
