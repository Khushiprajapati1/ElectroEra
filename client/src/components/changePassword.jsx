import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { KeyRound, Lock, Eye, EyeOff } from "lucide-react";
const ChangePassword = () => {
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // const [errors, setErrors] = useState({});

  //const { storeTokenInLS } = useAuth();

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
      const response = await fetch(`https://electroera.onrender.com/api/auth/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email }),
      });

      //console.log(response);
      const res_data = await response.json();
      console.log("res from server");

      if (response.ok) {
        toast.success("Password change Succsessfully");

        //storeTokenInLS(res_data.token);

        setFormData({
    
          code: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/Login_Form");
      } else {
        toast.error(
          "Invalid Email Id or Verification code"
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
  //       <h2 className="text-center text-2xl font-bold mb-4">Reset Your Password</h2>
  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">OTP:</label>
  //         <input
  //           type="text"
  //           name="code"
  //           value={formData.code}
  //           onChange={handleChange}
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //           pattern="[0-9]{6}"
  //           maxLength="6"
  //           minLength="6"
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm mb-1">Password:</label>
  //         <input
  //           type="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           className="border rounded bg-gray-100 w-full py-2 px-3"
  //           required
  //           minLength="7"
  //         />
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
  //       </div>
  //       <div className="flex justify-center mt-6">
  //         <button
  //           type="submit"
  //           className="bg-gray-500 cursor-pointer text-white rounded py-2 hover:bg-gray-700 px-5"
  //         >
  //           Change Password
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
return(
<div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
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
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full"></div>
        <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-blue-500/20 rounded-full"></div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <KeyRound className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-4">Reset Your Password</h2>
        <p className="text-blue-200/80 text-center mb-8">
          Enter the OTP sent to your email and create a new password
        </p>
        
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">OTP Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
              required
              pattern="[0-9]{6}"
              maxLength={6}
              minLength={6}
            />
          </div>

          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
                minLength={7}
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

          <div className="relative">
            <label className="block text-blue-200 text-sm mb-2 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
                required
                minLength={7}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
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

        <button
          type="submit"
          className="group cursor-pointer mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30 flex items-center justify-center"
        >
          Reset Password
        </button>

        <div className="mt-6 text-center">
          <a
            href="/Login_Form"
            className="text-blue-300 hover:text-blue-200 transition-colors duration-300 text-sm inline-flex items-center"
          >
            Back to Login
          </a>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </form>
    </div>
  );
};

export default ChangePassword;
