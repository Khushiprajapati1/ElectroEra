import React, { useState, useEffect, useContext } from "react";
import { Heart, ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import { useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useAddToCart } from "../store/addtocartcontext";
import { useWishlist } from "../store/wishlistContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { wishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  // const [userId,setUserId]=useState();

  const location = useLocation();
  const product = location.state?.product;
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

  // console.log(userId);

  // const { products } = useAuth();
  // const product = products.find((p) => p._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/review/getReviewByProduct`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({product:product?._id}),
        });
        const data = await response.json();
        setReviews(data.message || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    if (product?._id) fetchReviews();
  }, [product]);

  // Sample product data
  // const product = {
  //   name: "Premium Wireless Headphones",
  //   description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort with memory foam ear cushions. Perfect for music enthusiasts and professionals alike.",
  //   price: 299.99,
  //   brand: "SoundMaster",
  //   stock: 15,
  //   rating: 4.5,
  //   images: [
  //     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  //     "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
  //     "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80"
  //   ]
  // };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const wishlistMap = wishlist.reduce((acc, item) => {
    acc[item.product._id] = true;
    return acc;
  }, {});
  const isInWishlist = wishlistMap[product._id];

  const { addCart } = useAddToCart();

  const addToCart = (product, usrId, quantity) => {
    addCart(product, usrId, quantity);
  };

  const buyNow = () =>{
    if(!userId){
      return toast.error("Please Login to Buy Product!!");
    }
    if(product.stock <= 0){
      return toast.error("Product is out of stock");
    }
    else{
      navigate("/Checkout", {
            state: { cart: [{ product, quantity }] },
          })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold  text-left text-white/80">
          {product._id}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
          {/* Image Section */}
          <div className="relative group flex items-center justify-center flex-col py-12">
            <div className="relative w-full h-fit overflow-hidden rounded-lg bg-gray-800 cursor-pointer">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-101"
                onClick={() => setIsModalOpen(true)}
              />
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => toggleWishlist(product._id)}
              >
                {isInWishlist ? (
                  <FaHeart className="h-8 w-8 text-red-300" />
                ) : (
                  <FaRegHeart className="h-8 w-8 text-white" />
                )}
              </div>
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-6 h-6 " />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
            {/* Image Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index
                      ? "bg-gray-600 w-4 "
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, index) => ( 
                <Star
                  key={index}
                  className={`w-6 h-6 ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : index < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-400">({product.rating})</span>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col py-14">
            <h1 className="text-3xl font-bold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-gray-400 mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-white/70">Price</p>
                <p className="text-2xl font-bold text-white">
                  &#8377; {product.price}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-white/70">Stock</p>
                <p className="text-2xl font-bold text-white">
                  {product.stock} units
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-white/70">Brand</p>
                <p className="text-xl font-semibold text-white">
                  {product.brand}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-white/70">Quantity</p>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 cursor-pointer bg-white/70 rounded-l font-bold hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(product.stock, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-16 text-center border-y text-white font-bold border-gray-200 py-1"
                  />
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="px-3 py-1 cursor-pointer bg-white/70 rounded-r font-bold hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r cursor-pointer from-fuchsia-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold  transform transition-all duration-300 hover:scale-105"
              // onClick={() =>
              //   navigate("/Checkout", {
              //     state: { cart: [{ product, quantity }] },
              //   })
              // }>
              onClick={buyNow}
              >
                 Buy Now
              </button>
              <button
                className="flex-1 cursor-pointer bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold  transform transition-all duration-300 hover:scale-105"
                onClick={() => {
                  addToCart(product, userId, quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-2/3 max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-gray-500 text-white py-2 px-5 rounded-lg cursor-pointer"
            >
              X
            </button>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={prevImage}
                className="p-2 rounded-full bg-white shadow-md"
              >
                <ChevronLeft className="w-6 h-6 cursor-pointer" />
              </button>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="max-w-[500px] max-h-[500px] w-auto h-auto object-contain"
              />
              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-white shadow-md"
              >
                <ChevronRight className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet for this product.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="mb-4 border-b border-gray-700 pb-4"
            >
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">
                  by {review.user?.username || "Anonymous"}
                </span>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
