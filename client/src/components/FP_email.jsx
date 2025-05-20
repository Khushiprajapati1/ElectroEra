import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, KeyRound, ArrowRight } from "lucide-react";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
          const response = await fetch("https://electroera.onrender.com/api/auth/sendMail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
          });
    
          console.log("login form");
          const res_data = await response.json();
    
          if (response.ok) {
            toast.info("OTP sent to your Email");
            //storeTokenInLS(res_data.token);
            // Reset form fields
            // setFormData({
            //   email: "",
            //   //phone: "",
            //   password: "",
            // });
            
            console.log("OTP Sent");
    
            navigate("/changePassword", { state: { email } });
            setEmail("");
          } else {
            console.log("Invalid details");
            toast.error(
              "Email Id is not Registered"
            );
          }
        } catch (error) {
          console.log(error);
        }
    

}

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gray-900">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="bg-white p-6 rounded-lg shadow-md w-85"
  //     >
  //       <h2 className="text-center text-2xl font-bold mb-4">
  //         Forgot Password?
  //       </h2>

  //       <div className="flex justify-center mb-4">
  //         <label className="mr-4">Enter Registered Email</label>
  //       </div>
  //       <input
  //         type="email"
  //         className="border rounded bg-gray-100 w-full py-2 px-3"
  //         id="emailInput"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)} // Update email state
  //         required
  //       />

  //       <div className="flex justify-center mt-6">
  //         <button
  //           type="submit"
  //           className="bg-gray-500 text-white cursor-pointer rounded py-2 hover:bg-gray-700 px-5"
  //         >
  //           Send OTP
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

    <h2 className="text-3xl font-bold text-center text-white mb-4">Forgot Password?</h2>
    <p className="text-blue-200/80 text-center mb-8">
      No worries! Enter your email and we'll send you OTP to reset your password.
    </p>
    
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-blue-200 text-sm mb-2 font-medium">Email Address</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            className="w-full bg-white/10 border border-blue-500/20 rounded-xl py-3 px-4 pl-11 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50"
            required
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/80" />
        </div>
      </div>
    </div>

    <button
      type="submit"
      className="group cursor-pointer mt-8 w-full bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/30 flex items-center justify-center"
    >
      Send Reset OTP
      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
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

export default ForgotPasswordEmail;
