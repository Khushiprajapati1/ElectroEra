// src/components/layouts/DashboardLayout.jsx
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
//for current loggedin user
import { useAuth } from "../store/auth"; 
import { Navigate } from "react-router-dom";
 
//const {user,isLoading} = useAuth();


const DashboardLayout = ({ children }) => {

    const {user,isLoading} = useAuth();

    if(isLoading){
        return <h1>Loading...</h1>
    }
    //console.log(user.isAdmin)

    if(!user.isAdmin){
        return <Navigate to="/" />
     }
    
     
        //return <Navigate to="/dashboard" />
     
  return (
    <div className="main">
      {/* <Header /> */}
      <div className="contentMain flex">
        <div className="sidebarWrapper w-[18%]">
          <Sidebar />
        </div>
        <div className="contentRight py-4 px-5 w-[82%]">
          {children}
        </div>
      </div>
    </div>
  );
     
};

export default DashboardLayout;
