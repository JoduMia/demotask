import React from 'react'

const NotFound = () => {
  return (
    <div className='bg-[#00052b] flex flex-col items-center justify-center h-[92vh] space-y-4'>
        <h1 className='font-extrabold md:text-8xl text-white'>404</h1>
        <p className='text-yellow-300 text-3xl font-bold'>Oop! You are lost.</p>
        <p className='text-yellow-300 text-3xl font-bold'>Please try with a valid route.</p>
    </div>
  )
}

export default NotFound