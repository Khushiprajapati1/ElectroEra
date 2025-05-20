import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const LogOut = () => {

    const {logOutUser} = useAuth();
  useEffect(() => {
    logOutUser();
    window.location.reload();
  
  },1000, [logOutUser]);

  return <Navigate to = "/Login_Form" />
};

