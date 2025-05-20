import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const URL = "https://electroera.onrender.com/api/auth/login";

const LoginForm = () => {
  //const [isEmail, setIsEmail] = useState(true); // state to determine input type
  const [formData, setFormData] = useState({
    email: "",
    //phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  

  const { storeTokenInLS } = useAuth();
  // const [emailError, setEmailError] = useState(""); // state to hold email error
  // const [phoneError, setPhoneError] = useState(""); // state to hold phone error
  // const [passwordError, setPasswordError] = useState(""); // state to hold password error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error messages
    // setEmailError("");
    // setPhoneError("");
    // setPasswordError("");

    // Validation logic
    //let hasError = false;

    // if (isEmail) {
    //   if (!email) {
    //     setEmailError("Email is required.");
    //     hasError = true;
    //   }
    // } else {
    //   if (!phone || phone.length !== 10) {
    //     setPhoneError("Phone number must be 10 digits.");
    //     hasError = true;
    //   }
    // }

    // if (!password) {
    //   setPasswordError("Password is required.");
    //   hasError = true;
    // }

    //if (hasError) return; // Stop submission if there are errors

    // Handle form submission logic
    //console.log(formData);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("login form");
      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login Successfull");
        storeTokenInLS(res_data.token);
        // Reset form fields
        setFormData({
          email: "",
          //phone: "",
          password: "",
        });
        console.log("login successful");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate("/");
      } else {
        console.log("Invalid details");
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gray-900">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="bg-white p-6 rounded-lg shadow-md h-100 w-85"
  //     >
  //       <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

  //       <div className="mb-4">
  //         <label className="block text-sm mb-1" htmlFor="emailInput">
  //           E-mail :
  //         </label>
  //         <input
  //           type="email"
  //           name="email"
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           id="emailInput"
  //           value={formData.email}
  //           onChange={handleChange} // Update email state
  //           required
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm mb-1" htmlFor="password">
  //           Password:
  //         </label>
  //         <input
  //           type="password"
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           id="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange} // Update password state
  //           required
  //         />
  //       </div>

  //       <div className="flex flex-col items-center mt-6">
  //         <button
  //           type="submit"
  //           className="bg-gray-500 text-white rounded py-2 cursor-pointer hover:bg-gray-700 px-5 mb-2"
  //         >
  //           Submit
  //         </button>
  //         <Link
  //           to="/ForgotPassword_email"
  //           className="text-sm text-blue-950 hover:underline cursor-pointer"
  //         >
  //           Forgot Password?
  //         </Link>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-black/80 to-purple-900/90"></div>

      {/* Glass morphism form */}
      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-md bg-black/30 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-lg mx-4 border border-blue-500/20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back to ElectroEra</h2>
        
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">Email</label>
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
            <label className="block text-blue-200 text-sm mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
        </div>

        <div className="flex gap-5"><button
          type="submit"
          className="cursor-pointer mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
        >
           Login
        </button>
        <button
          className="cursor-pointer mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
        >
           <Link to="/Login_OR_Signup">Back</Link>
        </button></div>

        <div className="mt-6 text-center">
          <Link
            to="/ForgotPassword_email"
            className="text-blue-300 hover:text-blue-200 transition-colors duration-300 text-sm"
          >
            Forgot your password?
          </Link>
        </div>

        <p className="mt-6 text-center text-blue-200/60 text-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full"></div>
        <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-blue-500/20 rounded-full"></div>
      </form>
    </div>
  );
};

export default LoginForm;
