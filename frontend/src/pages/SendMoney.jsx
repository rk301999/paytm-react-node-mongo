import React, { useState } from 'react'
import Heading from '../components/Heading'
import { Navigate, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
const SendMoney = () => {

  const [searchParams] = useSearchParams();
  const [amount,setAmount] = useState("");
  const navigate = useNavigate();

  const id = searchParams.get("id")
  const name = searchParams.get("name")
  return (
    <div className='bg-slate-300 h-screen w-screen flex justify-center items-center '>
        <div className='  flex flex-col bg-white w-80 items-center justify-center gap-4 px-3 rounded-2xl py-3  lg:w-96 lg:px-5'>
          <Heading label="Send Money"/>
          <div className='flex gap-2 w-full items-center mt-6 mb-3'>
            <div className='h-10 w-10 bg-green-700 rounded-full items-center justify-center flex text-white'>{name[0].toUpperCase()}</div>
            <p className='font-semibold'>{name.charAt(0).toUpperCase()+name.slice(1)}</p>
          </div>
          <InputBox onChange={(e)=>setAmount(e.target.value)} label="Amount (in Rs)" placeholder="Enter amount"/>
          
          <button onClick={async()=>{
            await axios.post("http://localhost:8000/api/v1/account/transfer",{
              to:id,
              amount,
            },{
              headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            })
            navigate("/dashboard")
          }} className="bg-green-700 w-full text-white py-3 font-medium rounded-lg mt-1" >Initiate Transfer</button>
          
        </div>
    </div>
  )
}

export default SendMoney
