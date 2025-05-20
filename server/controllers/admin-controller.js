const User = require("../models/user-model");

const getAllUsers = async (req,res) =>{

    try {

        const users = await User.find({},{password:0});
        if(!users || users.length === 0){

            return res.status(404).json({message:"No Users Found"});

        }
        return res.status(200).json({message:users});
        
    } catch (error) {
        console.log(error);
        next(error);
    }

}

const makeUserAdmin = async (req, res, next) => {
    try {
      const { _id } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { isAdmin: true },
        { new: true, fields: { password: 0 } } // exclude password from response
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "User promoted to admin successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

module.exports = {getAllUsers,makeUserAdmin};