import React from 'react'
import MicButton from '../voice/MicButton'

const Hero = () => {
  return (
    <>
      <div className='flex justify-center gap-4 items-center flex-col'>
        <div className='flex justify-center items-center py-12 ' >
          <h2 className='text-center m-auto text-4xl font-semibold'>How can I help you today, <br /> Subhajit</h2>
        </div>


        <div>
          <MicButton/>
        </div>
        <div>
          <p className='py-12'>Tap to speak.</p>
        </div>
      </div>
    </>   
  )
}

export default Hero
