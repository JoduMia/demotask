import React from 'react'
import bg from '../assets/images/bg.jpg';
import wing from '../assets/images/wing.png';



const Home = () => {

  return (
    <div style={{backgroundImage: `url(https://cdn.pixabay.com/photo/2017/08/30/07/56/clock-2696234__340.jpg)`}} className='bg-fixed bg-cover bg-center w-full h-[70vh] bg-[#13131388] bg-blend-overlay overflow-hidden'>
        <div className='grid md:grid-cols-2 py-10 gap-5'>
          <div className='flex items-center justify-center '>
              <h1 className='text-3xl md:text-5xl lg:text-6xl leading-20 italic font-extrabold text-white uppercase '>Manage your<br/>Work schedule <br/> With Us</h1>
          </div>
          <div>
            <img src={wing} alt="" />
          </div>
        </div>

    </div>
  )
}

export default Home