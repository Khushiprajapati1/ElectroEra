const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  
  email: {
    type: String,
    require: true,
  },

  code : {
    type:String,
    required:true,
  },

});



//define model or connection name
const otp = new mongoose.model("Otp", otpSchema);

module.exports = otp;
