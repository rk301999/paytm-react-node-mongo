import React from 'react'

const InputBox = ({label,placeholder,onChange}) => {
  return (
    <div className='flex flex-col w-full py-1'>
      <label className='font-bold'>{label}</label>
      <input type="text" placeholder={placeholder} className='border-2 py-1 px-1 outline-none rounded-lg' onChange={onChange}/>
    </div>
  )
}

export default InputBox
