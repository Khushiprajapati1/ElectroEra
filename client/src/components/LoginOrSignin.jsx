import React from "react";
import { Link } from "react-router-dom";
import { CircuitBoard, ShieldCheck } from "lucide-react";

function LoginOrSignin() {
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
      
      {/* Glass morphism card */}
      <div className="relative backdrop-blur-md bg-black/40 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md border border-blue-500/20">
        <div className="flex justify-center mb-6">
          <CircuitBoard className="w-16 h-16 text-blue-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Welcome to ElectroEra
        </h2>
        <p className="text-blue-200/80 text-center mb-8">Your one-stop shop for electronics</p>

        <div className="flex flex-col gap-8">
        <Link
            to="/Login_Form"
            className="group bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-purple-500/90 hover:from-purple-500/90 hover:via-pink-400/90 hover:to-purple-400/90 transition-all duration-300 text-white text-center font-semibold py-4 px-6 rounded-2xl w-full backdrop-blur-sm shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Login to Your Account</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="text-blue-200/60 font-medium">OR</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          </div>

          <Link
            to="/Signup_Form"
            className="bg-white/10 hover:bg-white/20 transition-all duration-300 text-white text-center font-semibold py-4 rounded-2xl w-full backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-white/20"
          >
            Create a New Account
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-blue-200/60 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full"></div>
        <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-blue-500/20 rounded-full"></div>
      </div>
    </div>
  );
}

export default LoginOrSignin;

