import React from 'react'

const Appbar = () => {
  return (
    <div className='flex w-full justify-between shadow-xl p-2 rounded-md'>
        <div className='h-12 w-12'>
      <img src="https://assetscdn1.paytm.com/images/catalog/view/310944/1697527183231.png" alt="" />
    </div>
    <div className='flex gap-2 items-center'>
        <p>Hello</p>
        <div className='w-10 h-10 bg-slate-500 flex items-center justify-center rounded-full text-white'>U</div>
    </div>
    </div>
  )
}

export default Appbar
