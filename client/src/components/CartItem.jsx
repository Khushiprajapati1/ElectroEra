import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag, HiOutlineTrash } from "react-icons/hi";
import { IoBagCheckOutline } from "react-icons/io5";
import { useAddToCart } from "../store/addtocartcontext";
import { Star } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { GoArrowUpRight } from "react-icons/go";

const Cart = () => {
  const { cartItems, totalCartItems, fetchCart, deleteFromCart } =
    useAddToCart();
  const [finalPrice, setFinalPrice] = useState(0);
  const [username, setUsername] = useState(null);
  const { user } = useAuth();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded._id || decoded.userId;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      setUsername(user.username + "'s");
    } else {
      setUsername("My");
    }
    fetchCart(userId);
  }, []);

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item) => {
      price += item.totalPrice;
    });
    setFinalPrice(price);
  }, [cartItems]);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-10 bg-gray-900">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-left font-medium mb-6 text-white flex items-center gap-2">
        {username} Bag <HiOutlineShoppingBag className="inline-block" />
      </h2>
      <h1 className="text-white/70 mb-5 text-sm sm:text-base">
        Total Items in bag: {totalCartItems}
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center bg-gray-800 p-6 sm:p-10 shadow-md rounded-lg text-center">
          <img
            src="/images/Cart_Empty_image.jpg"
            alt="Empty Bag"
            className="w-full max-w-sm h-auto mb-4 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl text-red-600 font-semibold mb-2">
            Your Bag is empty :(
          </h1>
          <p className="text-white font-semibold mb-4">
            Choose something to make me happy :)
          </p>
          <button
            className="px-6 py-2 text-white bg-pink-400 rounded-md hover:bg-pink-500 transition flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            Explore Now <GoArrowUpRight className="text-2xl" />
          </button>
        </div>
      ) : (
        cartItems.map((item) => (
          <div
            className="bg-gray-800 rounded-xl mb-8 sm:mb-10 text-gray-200"
            key={item._id}
          >
            <div className="flex flex-col sm:flex-row items-start gap-6 p-4 sm:p-5">
              <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="w-full sm:w-40 h-auto object-contain"
              />
              <div className="flex flex-col gap-2 sm:gap-1">
                <h4 className="font-bold text-white text-base sm:text-lg">
                  {item.product.name}
                </h4>
                <p className="text-sm sm:text-base">
                  Price : ₹ {item.product.price}
                </p>
                <p className="text-sm sm:text-base">
                  Quantity : {item.quantity}
                </p>
                <p className="text-sm sm:text-base">
                  Stock : {item.product.stock}
                </p>
                <p className="text-sm sm:text-base">
                  Total Price : ₹ {item.totalPrice}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(item.product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : index < item.product.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-400 text-xs sm:text-sm">
                    ({item.product.rating})
                  </span>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold rounded w-full sm:w-40 py-3 px-4 hover:scale-105 transition"
                    onClick={() =>
                      navigate("/Checkout", { state: { cart: [item] } })
                    }
                  >
                    Buy Now{" "}
                    <HiOutlineShoppingBag className="inline-block ml-1 text-xl" />
                  </button>
                  <button
                    className="bg-fuchsia-800 text-white font-bold rounded w-full sm:w-40 py-3 px-4 hover:scale-105 transition"
                    onClick={() =>
                      deleteFromCart(userId, item._id, item.product._id)
                    }
                  >
                    Remove{" "}
                    <HiOutlineTrash className="inline-block ml-1 text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Total Price of all items: ₹ {finalPrice}
          </h3>
          <button
            className="bg-pink-400 font-bold text-white rounded py-3 px-5 hover:bg-pink-500 transition flex items-center gap-1"
            onClick={() =>
              navigate("/Checkout", { state: { cart: cartItems } })
            }
          >
            Proceed to checkout <IoBagCheckOutline className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
