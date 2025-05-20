import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [products, setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [user,setUser] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const getProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/products",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data.message);
        setProducts(data.message);
      }
    } catch (error) {
      console.log(`products frontend error ${error}`);
    }
  };

  //to fetch products data from database
  useEffect(() => {
    getProducts();
  }, []);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);

    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; //if token is true then isloggedin also true and if token is false then it is also false

  //Log out functionality
  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };


  //Authentication for currentely loggedin user data

  const userAuthentication = async() =>{

    try {

      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/user",
        {
          method:"GET",
          headers:{
            Authorization:authorizationToken
          }
        }
      )

      if(response.ok){
        const data = await response.json();
        // console.log("user data", data.message);
        setUser(data.message);
        
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
      }
      
    } catch (error) {
      console.log("Error Fetching in User data")
    }
  }

  useEffect(()=>{
    userAuthentication()
  },[]);

  return (
    <AuthContext.Provider
    
      value={{ storeTokenInLS, logOutUser, isLoggedIn, products, user, authorizationToken ,isLoading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
