import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center items-center ">
      <div className="  flex flex-col bg-white w-80 items-center justify-center gap-4 px-3 rounded-2xl py-3 lg:w-96 lg:px-5">
        <Heading label="Sign up" />
        <Subheading label="Enter your information to create an account" />
        <InputBox
          label="First Name"
          placeholder="John"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <InputBox
          label="Last Name"
          placeholder="Doe"
          onChange={(e) => setLastname(e.target.value)}
        />
        <InputBox
          label="Email"
          placeholder="ritesh@gmail.com"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox
          label="Password"
          placeholder="123456"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="Sign up"
          color="green"
          onClick={async() =>
            {await axios.post("http://localhost:8000/api/v1/user/signup", {
              firstname,
              lastname,
              username,
              password,
            })
            navigate("/signin")
          }
            
          }
        />
        <BottomWarning
          label="Already have an account ?"
          buttontext="Sign in"
          to="/signin"
        />
      </div>
    </div>
  );
};

export default Signup;
