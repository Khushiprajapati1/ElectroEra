import React, { useEffect } from "react";
import { useState } from "react";
import {
  FaHistory,
  FaBoxOpen,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaShoppingBag,
} from "react-icons/fa";
import { useOrder } from "../store/order-context";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { getOrdersByUser } = useOrder();
  const { user } = useAuth();
  const userId = user._id;
  const [orders, setOrders] = useState([]);

  //console.log(userId)

  useEffect(() => {
    if (!user || !user._id) return;
    const getOrderHistory = async () => {
      try {
        const response = await getOrdersByUser(userId);
        if (response.success) {
          setOrders(response.orders);
        } else {
          toast.error("Failed get Orders.");
        }
      } catch (error) {
        console.log(`Error in order history: ${error}`);
        toast.error("An error occurred while getting the Orders");
      }
    };
    getOrderHistory();
  }, [user]);
  //console.log(orders)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-6">
          <span className="flex items-center gap-2">
            Order History <FaHistory className="text-white text-[28px]" />
          </span>
        </h1>
        {!user || !user._id || orders.length===0 ? (
          <div className="flex flex-col justify-center items-center gap-4">
          <div className="h-full/2 w-full/2 flex items-center justify-center">
            <img
              src="/images/No_Orders.webp"
              className="w-full/2 h-full/2 align-middle"
            ></img>
          </div>
          <span className="text-5xl text-white font-bold">No Orders :(</span>
          <button className="text-xl bg-pink-500 rounded px-5 py-5 cursor-pointer text-white font-bold hover:bg-pink-600 transition-all duration-500 "><Link to="/" className="flex items-center gap-2">Explore and Make Orders <GoArrowUpRight className="font-extrabold text-2xl" /></Link></button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-800 flex items-center gap-1">
                      <FaBoxOpen className="text-gray-500" />
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-800 flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-500" />
                      Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-base font-medium text-gray-800 flex items-center gap-1 mt-1">
                      &#8377; {order.finalPrice}
                    </p>
                    <p className="text-sm text-black">
                      Payment Method :{" "}
                      <span className="text-gray-500">
                        {order.paymentMethod}
                      </span>{" "}
                      | Payment Status :{" "}
                      <span className="text-gray-500">
                        {order.paymentStatus}
                      </span>
                    </p>
                    <p className="text-sm text-black">
                      Order Status :{" "}
                      <span className="text-gray-500">{order.orderStatus}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${
                        order.status === "Delivered"
                          ? "bg-gradient-to-r from-green-200 to-green-400 text-green-900"
                          : "bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900"
                      }`}
                    >
                      <FaShoppingBag />
                      {order.orderStatus}
                    </span>
                    <br />
                    <br />
                    <button
                      className="mt-2 text-sm text-gray-600 hover:text-blue-500 flex items-center gap-1 transition cursor-pointer"
                      onClick={() =>
                        setExpandedOrder(expandedOrder === index ? null : index)
                      }
                    >
                      {expandedOrder === index ? (
                        <>
                          <FaChevronUp />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <FaChevronDown />
                          View Details
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {expandedOrder === index && (
                  <div className="mt-4 pt-4 border-t border-gray-300 space-y-4">
                    {order.products.map((prod, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 rounded-xl p-3 transition"
                      >
                        <img
                          src={prod.product.images[0]}
                          alt={prod.product.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-300"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">
                            {prod.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {prod.quantity} | {prod.product.price}
                          </p>
                        </div>
                        <button className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1 transition duration-200">
                          <FaShoppingBag />
                          <Link to="/">Explore More</Link>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
