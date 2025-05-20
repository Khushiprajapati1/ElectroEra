import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { UserPlus, Mail, Phone, Lock, KeyRound, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // const [errors, setErrors] = useState({});

  const { storeTokenInLS } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the form on every change
    // const validationErrors = validate();
    // setErrors(validationErrors);
  };

  // const validate = () => {
  //   const newErrors = {};
  //   if (formData.username.length < 3 || formData.username == "") {
  //     newErrors.username = "Username must be at least 3 characters long.";
  //   }
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if ((!emailPattern.test(formData.email)) || (formData.email == "")) {
  //     newErrors.email = "Please enter a valid email address.";
  //   }
  //   if (formData.phone.length !== 10 || formData.phone == "") {
  //     newErrors.phone = "Phone number must be 10 digits long.";
  //   }
  //   if (formData.password.length < 6 || formData.password == "") {
  //     newErrors.password = "Password must be at least 6 characters long.";
  //   }
  //   if (formData.password !== formData.confirmPassword || formData.confirmPassword == "") {
  //     newErrors.confirmPassword = "Passwords do not match.";
  //   }
  //   return newErrors;
  // };

  //handling submission of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length === 0) {
    // Submit the form
    console.log("Form submitted:");
    // Reset form

    // setErrors({}); // Reset errors on successful submission
    // } else {
    //   setErrors(validationErrors);
    // }

    if (formData.password != formData.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }

    try {
      const response = await fetch(`https://electroera.onrender.com/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //console.log(response);
      const res_data = await response.json();
      console.log("res from server");

      if (response.ok) {
        toast.info("OTP sent to your registered Email");

        storeTokenInLS(res_data.token);

        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/OTP_Page");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("SignUp", error);
    }
  };

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gray-900">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="bg-white p-6 rounded-lg shadow-md w-85"
  //     >
  //       <h2 className="text-center text-2xl font-bold mb-4">SignUp Page</h2>
  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">Username:</label>
  //         <input
  //           type="text"
  //           name="username"
  //           value={formData.username}
  //           placeholder="Enter username here"
  //           autoComplete="off"
  //           onChange={handleChange}
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //         />
  //         {/* {errors.username && (
  //           <p className="text-red-500 text-xs">{errors.username}</p>
  //         )} */}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">E-mail:</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           placeholder="Enter Email here"
  //           onChange={handleChange}
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //         />
  //         {/* {errors.email && (
  //           <p className="text-red-500 text-xs">{errors.email}</p>
  //         )} */}
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">Phone Number:</label>
  //         <input
  //           type="tel"
  //           name="phone"
  //           value={formData.phone}
  //           onChange={handleChange}
  //           placeholder="Enter phone number here"
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //           pattern="[0-9]{10}"
  //           maxLength="10"
  //         />
  //         {/* {errors.phone && (
  //           <p className="text-red-500 text-xs">{errors.phone}</p>
  //         )} */}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">Password:</label>
  //         <input
  //           type="password"
  //           name="password"
  //           value={formData.password}
  //           placeholder="Enter password here"
  //           onChange={handleChange}
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //         />
  //         {/* {errors.password && (
  //           <p className="text-red-500 text-xs">{errors.password}</p>
  //         )} */}
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">Confirm Password:</label>
  //         <input
  //           type="password"
  //           name="confirmPassword"
  //           value={formData.confirmPassword}
  //           onChange={handleChange}
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //           minLength="7"
  //         />
  //         {/* {errors.confirmPassword && (
  //           <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
  //         )} */}
  //       </div>
  //       <div className="flex justify-center mt-6">
  //         <button
  //           type="submit"
  //           className="bg-gray-500 cursor-pointer text-white rounded py-2 hover:bg-gray-700 px-5"
  //         >
  //           {/* <Link to="/OTP_Page"> */}
  //           Submit
  //           {/* </Link>  */}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-black/80 to-purple-900/90"></div>

      {/* Glass morphism form */}
      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-md bg-black/30 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-2xl mx-4 border border-blue-500/20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create Account at ElectroEra
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
              />
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400/80 hover:text-blue-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-blue-200 text-sm mb-2 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
                minLength={7}
              />
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400/80 hover:text-blue-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
          >
            Create Account
          </button>
          <button className="mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30">
            <Link to="/Login_OR_Signup">Back</Link>
          </button>
        </div>

        <p className="mt-6 text-center text-blue-200/60 text-sm">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full"></div>
        <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-blue-500/20 rounded-full"></div>
      </form>
    </div>
  );
};

export default SignUp;
