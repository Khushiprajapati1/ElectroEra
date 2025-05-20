import React, { useEffect, useState } from "react";
import { useWishlist } from "../store/wishlistContext";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { RxCrossCircled } from "react-icons/rx";
import { useAddToCart } from "../store/addtocartcontext";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";

const WishList = () => {
  // Sample wishlist items
  const { wishlist, toggleWishlist } = useWishlist();
  const { addCart } = useAddToCart();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUsername(user.username + "'s");
    } else {
      setUsername("My");
    }
  }, []);

  const addToCart = (product, usrId, quantity) => {
    addCart(product, usrId, quantity);
  };
  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <h1 className="text-3xl text-left font-medium mb-6 text-white">
        {username} WishList <FaRegHeart className="inline-block" />
      </h1>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center bg-gray-900 p-10 shadow-md rounded-lg">
          <img
            src="/images/Empty_Wishlist.jpg"
            alt="Wishlist"
            className="w-100 h-80 mb-2 items-center object-contain"
          />
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Your WishList is empty!
          </h1>
          <p className="mb-4 text-white">
            {" "}
            seems like you don't have wishes here....
            Make a wish! <FaHeart className="inline-block" />
          </p>
          <button
            className="px-6 py-2 text-white cursor-pointer bg-pink-400 rounded-md hover:bg-pink-500 transition flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            Explore Now <GoArrowUpRight className="font-extrabold text-2xl" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4  rounded-lg ">
          {wishlist.map((item) => {
            const product = item.product;
            return (
              <div
                key={product._id}
                className=" rounded-lg p-4 shadow-lg bg-gray-800 text-gray-200 flex flex-col"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-t-lg border-b border-white/20"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-300">&#8377; {product.price}</p>
                <div className="flex gap-5 ">
                  <button
                    className="mt-4 bg-fuchsia-800 text-white cursor-pointer font-bold py-3 px-5 rounded-lg hover:scale-103 "
                    onClick={() => addToCart(product, user._id, 1)}
                  >
                    Add to cart{" "}
                    <HiOutlineShoppingBag className="inline-block ml-2 text-2xl" />
                  </button>
                  <button
                    className="mt-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white cursor-pointer font-bold py-3 px-5 rounded-lg hover:scale-103 "
                    onClick={() => toggleWishlist(product._id)}
                  >
                    Remove{" "}
                    <RxCrossCircled className="inline-block ml-2 text-2xl" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;
