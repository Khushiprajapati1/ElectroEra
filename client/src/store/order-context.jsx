import React from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

export const OrderContext = createContext();

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000/api/order";

  const placeOrder = async (orderData) => {
    try {
      const response = await fetch(`${BASE_URL}/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({orderData}),
      });

      const data = await response.json();
       if(response.ok){
    //     toast.success(data.message);
    // console.log(data.message)
    return { success: true, order: data.message };
       }
       else{
    //     toast.error(data.message);
    return { success: false, error: data.message };
       }
    } catch (error) {
      console.error("Place order error:", error);
      return { success: false, data: null };
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllOrders`);
      const data = await response.json();
      return { success: true, orders:data.message };
    } catch (error) {
      console.error("Get all orders error:", error);
      return { success: false, data: null };
    }
  };

  const getOrdersByUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/getOrderByUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId }),
      });

      const data = await response.json();
      
      return { success:true, orders:data.message };
    } catch (error) {
      console.error("Get orders by user error:", error);
      return { success: false, data: null };
    }
  };

  const getSingleOrder = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/single`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: orderId }),
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("Get single order error:", error);
      return { success: false, data: null };
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/updateOrderStatus`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: orderId, orderStatus: newStatus }),
      });

      const data = await response.json();
      return { success: true, message:data.message };
    } catch (error) {
      console.error("Update order status error:", error);
      return { success: false, data: null };
    }
  };

  const updatePaymentStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/updatePaymentStatus`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: orderId, paymentStatus: newStatus }),
      });

      const data = await response.json();
      return { success: true, message:data.message };
    } catch (error) {
      console.error("Update payment status error:", error);
      return { success: false, message: null };
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: orderId }),
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("Delete order error:", error);
      return { success: false, data: null };
    }
  };

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        getAllOrders,
        getOrdersByUser,
        getSingleOrder,
        updateOrderStatus,
        updatePaymentStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
