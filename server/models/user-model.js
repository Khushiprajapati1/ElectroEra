const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  phone: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  isverified:{
    type:Boolean,
    default:false,
  },
  verificationCode:String,

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//hashing password using pre method
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    //hashing the password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//comparing password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password,this.password);
    
}

//json web token (don't storevin database, store only in browser)
//instance method
userSchema.methods.generateToken = async function(){

    try{
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"60d",
        }
        
    )
    }
    catch(error){
        console.error(error);
    }

}

//define model or connection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
