import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar.jsx'
import Balance from '../components/Balance.jsx'
import Users from '../components/Users.jsx'
import axios from 'axios'

const Dashboard = () => {
  const [amount,setAmount] = useState();
  useEffect(()=>{
    async function getData(){
      let response = await axios.get("http://localhost:8000/api/v1/account/balance",{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      setAmount(response.data.balance)
      console.log(response.data);
    }
    getData();
  },[])

  return (
    <div className='bg-slate-300 h-screen w-screen flex justify-center items-center '>
        <div className='  flex flex-col bg-white w-[90vw] h-[90vh] items-center  gap-4 px-3 rounded-2xl py-3 '>
          <Appbar/>
          <Balance balance={parseInt(amount)}/>
          <Users/>
        </div>
    </div>
  )
}

export default Dashboard
