import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const  User =({user})=>{
  const navigate = useNavigate();
    return <div className='w-full  py-3 px-1 flex justify-between'>
        <div className="first flex items-center gap-3 ">
            <div className='w-10 h-10 bg-slate-300 flex justify-center items-center rounded-full'>R</div>
            <div>{user.firstname} {user.lastname}</div>
        </div>
        <button className='bg-black text-white p-2 rounded-md' onClick={()=>{
            navigate("/send?id="+user._id +"&name=" + user.firstname);
        }}>Send Money</button>
    </div>
}

const Users = () => {
    
    const [users,setUsers]=useState([])
    const [userInput, setUserInput]=useState("")

    useEffect(()=>{
      const getusers=async()=>{
        const response = await axios.get(`http://localhost:8000/api/v1/user/bulk?filter=${userInput}`,{
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        console.log(response);
        const data = await response.data.user;
        setUsers(data);
      }
      getusers()
    },[userInput,setUserInput])
  return (
    <div className='w-full flex flex-col gap-3 overflow-y-scroll'>
      <div className='font-bold text-2xl'>Users</div>
      <input type="text" placeholder='Search users...' className=' w-full p-2 outline-none border-2' onChange={(e)=>setUserInput(e.target.value)}/>
      <div >
        {users.map(user=>{
            return <User user={user}/>
        })}
      </div>
    </div>
  )
}

export default Users
