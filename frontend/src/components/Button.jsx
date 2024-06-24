import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, onClick, to }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black w-full text-white py-3 font-medium rounded-lg mt-1 text-center"
    >
      {label}
    </button>
  );
};

export default Button;
