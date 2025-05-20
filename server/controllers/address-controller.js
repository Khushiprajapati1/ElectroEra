const Address = require("../models/address-model");

// Define valid Ahmedabad pincodes
const ahmedabadPincodes = [
  "380001", "380002", "380003", "380004", "380005", "380006", "380007", "380008", "380009", "380010",
  "380011", "380012", "380013", "380014", "380015", "380016", "380017", "380018", "380019", "380020",
  "380021", "380022", "380023", "380024", "380025", "380026", "380027", "380028", "380029", "380030",
  "380031", "380032", "380033", "380034", "380035", "380036", "380037", "380038", "380039", "380040",
  "380041", "380042", "380043", "380044", "380045", "380046", "380047", "380048", "380049", "380050",
  "380051", "380052", "380053", "380054", "380055", "380056", "380057", "380058", "380059", "380060",
  "380061", "380062", "380063", "380064", "380065", "380066", "380067", "380068", "380069", "380070",
  "380071", "380072", "380073", "380074", "380075", "380076", "380077", "380078", "380079", "380080",
  "380081", "380082", "380083", "380084", "380085", "380086", "380087", "380088", "380089", "380090",
  "380091", "380092", "380093", "380094", "380095", "380096", "380097", "380098", "380099", "382001",
  "382002", "382003", "382004", "382005", "382006", "382007", "382008", "382009", "382010", "382011",
  "382012", "382013", "382014", "382015", "382016", "382017", "382018", "382019", "382020", "382021",
  "382022", "382023", "382024", "382025", "382026", "382027", "382028", "382029", "382030", "382031",
  "382032", "382033", "382034", "382035", "382036", "382037", "382038", "382039", "382040", "382041",
  "382042", "382043", "382044", "382045", "382046", "382047", "382048", "382049", "382050", "382051",
  "382052", "382053", "382054", "382055", "382056", "382057", "382058", "382059", "382060", "382061",
  "382062", "382063", "382064", "382065", "382066", "382067", "382068", "382069", "382070", "382071",
  "382072", "382073", "382074", "382075", "382076", "382077", "382078", "382079", "382080", "382081",
  "382082", "382083", "382084", "382085", "382086", "382087", "382088", "382089", "382090", "382091",
  "382092", "382093", "382094", "382095", "382096", "382097", "382098", "382099","382415"
]


//add new address
const addAddress = async (req, res, next) => {
  try {
    const { user, houseNo, street, landmark, city, state, pincode } = req.body;
    if (!ahmedabadPincodes.includes(pincode)) {
      return res.status(400).json({ message: "Only Ahmedabad pincodes are allowed." });
    }

    const addressAdded = await Address.create({
      user,
      houseNo,
      street,
      landmark,
      city,
      state,
      pincode,
    });

    if (!addressAdded) {
      return res.status(404).json({ message: "Failed to add new address" });
    }

    return res.status(201).json({ message: "Address Added Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get address by userId
const getAddress = async (req, res, next) => {
  try {
    const { user } = req.body;
    const address = await Address.findOne({ user });

    // if (!address) {
    //   return res.status(404).json({ message: "Address Not Found" });
    // }

     return res.status(200).json({ message: address });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Update address
const updateAddress = async (req, res, next) => {
  try {
    const { user, houseNo, street, landmark, city, state, pincode } = req.body;
    if (!ahmedabadPincodes.includes(pincode)) {
      return res.status(400).json({ message: "Only Ahmedabad pincodes are allowed." });
    }
    const updatedAddress = await Address.findOneAndUpdate(
        { user },
        {
          $set: {
            houseNo,
            street,
            landmark,
            city,
            state,
            pincode,
          },
        },
        { new: true }
  
    );

    // console.log(req.body)

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address Not Found" });
    }

    return res.status(200).json({ message:"Address Updated Successfully",data:updatedAddress });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { addAddress, getAddress, updateAddress };
