import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttontext, to }) => {
  return (
    <div className="flex gap-1 font-medium">
      <div>{label}</div>
      <Link to={to} className="underline" target="_blank">{buttontext}</Link>
    </div>
  );
};

export default BottomWarning;
