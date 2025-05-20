import React from "react";

const Badge = (props) => {
  return (
    <span
      className={`flex items-center justify-center py-1 px-1 rounded-full text-[11px] 
    capitalize ${props.status === "Pending" && "bg-yellow-500 text-white"} ${
        props.status === "confirm" && "bg-green-600 text-white"
      }${props.status === "Paid" && "bg-green-600 text-white"}${
        props.status === "Paid" && "bg-green-600 text-white"
      }${props.status === "Failed" && "bg-red-600 text-white"} ${
        props.status === "Delivered" && "bg-blue-600 text-white"
      }`}
    >
      {props.status}
    </span>
  );
};
export default Badge;
