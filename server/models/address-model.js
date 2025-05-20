const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  houseNo : { type: String, required: true,trim: true },
  street: { type: String, required: true,trim: true },
  landmark: { type: String ,trim: true},
  city: { type: String, required: true, default:"Ahmedabad" },
  state: { type: String, required: true ,default:"Gujarat"},
  pincode: { type: String, required: true,match: /^[1-9][0-9]{5}$/,trim: true },
  
});

const Address = new model("Address", addressSchema);

module.exports = Address;