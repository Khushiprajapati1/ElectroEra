import React, { useState,useContext,useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from '../store/addtocartcontext';
import { useWishlist } from "../store/wishlistContext"; 
import { SearchContext } from "../store/searchContext";
import { FiShoppingCart } from "react-icons/fi";


export default function MixerProducts() {

  const {user,products} = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const { searchTerm } = useContext(SearchContext);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const MixerProducts = products.filter((product) => product.category === "Mixer");
  const filteredProducts = MixerProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const wishlistMap = wishlist.reduce((acc, item) => {
    acc[item.product._id] = true;
    return acc;
  }, {});
  const userId = user._id;

  const { addCart } = useAddToCart();
  
    const addToCart=(product,usrId,quantity)=>{
  
      addCart(product,usrId,quantity);
      
    }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Mixer Grinders.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          
          const {_id,name,images,price} = product;
    

          return (
            <div
              key={_id}
              className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 relative" // Added relative positioning
              onClick={() => navigate(`/Product`,{ state: { product } })}
            >
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); 
                  toggleWishlist(_id); }}
              >
                {wishlistMap[_id]? (
                  <FaHeart className="h-6 w-6 text-red-300" />
                ) : (
                  <FaRegHeart className="h-6 w-6 text-white" />
                )}
              </div>
              <img
                src={images?.[0]}
                alt="Mixer"
                className="w-full h-60 object-cover rounded-md mb-4 cursor-pointer"
              />
              <h2 className="text-sm font-medium text-gray-300">
                {name}
              </h2>
              <p className="text-sm">&#8377; {price}</p>
              <button className="mt-4 flex items-center gap-2 justify-center w-full cursor-pointer bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-2 rounded transition-transform transform hover:scale-103"
              onClick={()=>{addToCart(product,userId,1)}}>
                Add to Cart <FiShoppingCart className="text-xl"/>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
