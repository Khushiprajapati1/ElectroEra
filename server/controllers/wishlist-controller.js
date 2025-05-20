const Wishlist = require("../models/wishlist-model");

//To add and delete product from wishlist
const toggleWishlist = async (req, res, next) => {
  try {
    const { user, product } = req.body;

    if(!user){
      return res.status(400).json({ message: "Login First!!" });
    }
    const existing = await Wishlist.findOne({ user, product });
    if (existing) {
      await existing.deleteOne();
      return res.status(201).json({ message: "Product Removed from wishlist" });
    }
    const newItem = new Wishlist({ user, product });
    await newItem.save();

    return res.status(201).json({ message: "Product Added to wishlist" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getWishList = async(req,res,next)=>{
    try {

        const {user} = req.body;
        const wishlist = await Wishlist.find({ user }).populate("product");

        if(!wishlist){
            return res.status(404).json({message:"Failed to fetch Wishlist"})
        }
  
        //console.log(wishlist)
        return res.status(201).json({message:wishlist});
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { toggleWishlist,getWishList };
