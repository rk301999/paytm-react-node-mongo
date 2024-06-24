import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center items-center ">
      <div className="  flex flex-col bg-white w-80 items-center justify-center gap-5 px-3 rounded-2xl py-3 lg:w-96 lg:px-5">
        <Heading label="Sign In" />
        <Subheading label="Enter your credentials to access your account" />
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
          label="Sign In"
          onClick={async () =>
            {let response = await axios.post("http://localhost:8000/api/v1/user/signin", {
              username,
              password,
            },{
              withCredentials: true // Necessary to receive cookies
            })
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
          }
          }
          
        />
        
        <BottomWarning
          label="Don't have an account ?"
          buttontext="Sign Up"
          to="/signup"
        />
      </div>
    </div>
  );
};

export default Signin;
