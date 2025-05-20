import React, { useState, useEffect, useRef } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { UserCircle, Upload, Check } from "lucide-react";
import { toast } from "react-toastify";

const MyProfilePage = () => {
  const { user } = useAuth();
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState([]); // Changed to array
  const [occupation, setOccupation] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("Ahmedabad");
  const [state, setState] = useState("Gujarat");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    if (user) {
      setFullName(user.username || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phone || "");

      const fetchAddress = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/address/getAddress",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user: user._id }),
            }
          );
          const data = await response.json();

          if (response.ok) {
            setAddress(data.message);
            setHouseNo(data.message.houseNo || "");
            setStreet(data.message.street || "");
            setLandmark(data.message.landmark || "");
            setPinCode(data.message.pincode || "");
            setCity(data.message.city || "");
            setState(data.message.state || "");
          } else if (response.status === 404) {
            setHouseNo(null);
            setStreet(null);
            setLandmark(null);
            setPinCode(null);
            setCity(null);
            setState(null);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAddress();
    }
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhoneNumber = (number) => /^\+?\d{10}$/.test(number);
  const validatePinCode = (pin) => /^\d{6}$/.test(pin);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validate all fields
    if (!fullName) newErrors.fullName = "Full Name is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!validatePhoneNumber(phoneNumber))
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    if (!email) newErrors.email = "Email is required.";
    if (!validateEmail(email)) newErrors.email = "Invalid email format.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (languages.length === 0)
      newErrors.languages = "At least one language is required.";
    if (!pinCode) newErrors.pinCode = "Pin Code is required.";
    if (!validatePinCode(pinCode))
      newErrors.pinCode = "Pin Code must be exactly 6 digits.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";

    setErrors(newErrors);

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // console.log("Form Submitted:", {
      //   gender,
      //   languages,
      //   pinCode,
      //   city,
      //   state,
      //   fullName,
      //   phoneNumber,
      //   email,
      // });
      setSuccessMessage(
        <>
          <FaCheckCircle className="inline-block" /> Profile information has
          been updated successfully.
        </>
      );
      setTimeout(() => {
        setSuccessMessage(null); // Hide success message after 3 seconds
      }, 3000);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (language) => {
    setLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((item) => item !== language);
      } else {
        return [...prev, language];
      }
    });
  };

  const updateUserAddress = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You are not Logged in, Login First");
      return;
    }
    try {
      const url = address
        ? "http://localhost:5000/api/address/updateAddress"
        : "http://localhost:5000/api/address/addAddress";

      const method = address ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          houseNo: houseNo,
          street: street,
          landmark: landmark,
          city: city,
          state: state,
          pincode: pinCode,
        }),
      });

      // console.log(user, houseNo, street, landmark, city, state, pinCode);

      const data = await response.json();
      if (response.ok) {
        toast.success("Changes Saved Successfully");
        setHouseNo(data.updatedAddress.houseNo || "");
        setStreet(data.updatedAddress.street || "");
        setLandmark(data.updatedAddress.landmark || "");
        setPinCode(data.updatedAddress.pincode || "");
        setCity(data.updatedAddress.city || "");
        setState(data.updatedAddress.state || "");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }

    // console.log(user._id, pinCode, houseNo, street, landmark, city, state);
  };
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-indigo-500 transition-all duration-300 group-hover:border-indigo-400"
              />
            ) : gender === "male" ? (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-4 border-indigo-500 transition-all duration-300 group-hover:border-indigo-400">
                <FcBusinessman className="w-16 h-16 text-gray-400" />
              </div>
            ) : gender === "female" ? (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-4 border-indigo-500 transition-all duration-300 group-hover:border-indigo-400">
                <FcBusinesswoman className="w-16 h-16 text-gray-400" />
              </div>
            ) : gender === "other" ? (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-4 border-indigo-500 transition-all duration-300 group-hover:border-indigo-400">
                <FaUserCircle className="text-4xl text-gray-500 ml-2" />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleUploadClick}
                className="ml-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400"
              >
                <AiOutlinePlus className="text-xl" />
              </button>
            )}

            {/* <button
              type="button"
              onClick={handleUploadClick}
              className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full hover:bg-indigo-400 transition-colors duration-300"
            >
              <Upload className="w-4 h-4 text-white" />
            </button> */}
          </div>
          <h1 className="text-3xl font-bold text-white mt-4 mb-1">
            My Profile
          </h1>
          <p className="text-gray-400">Manage your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full cursor-not-allowed bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={user?.phone || ""}
                readOnly
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Pin Code</label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
                maxLength={6}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">House Number</label>
              <input
                type="text"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Street</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full cursor-not-allowed bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full cursor-not-allowed bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                required
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Gender</label>
            <div className="flex space-x-6">
              {["Male", "Female", "Other"].map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    checked={gender === option.toLowerCase()}
                    onChange={() => setGender(option.toLowerCase())}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center transition-colors duration-300 ${
                      gender === option.toLowerCase()
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-500 bg-gray-700"
                    }`}
                  >
                    {gender === option.toLowerCase() && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded-lg flex items-center justify-center space-x-2">
              <Check className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-8 py-3 cursor-pointer rounded-lg font-medium hover:bg-indigo-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={updateUserAddress}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
