import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <>
       <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div id='logo' className=' cursor-pointer flex items-center'>
                 <Image
                src= "/logo.jpeg"
                alt="logo"
                width={80}
                height={80} 
                />
                <h1 className='text-3xl  '>VaaniKoosh AI</h1>
            </div>
            <div id='right' className='pr-4 flex items-center gap-4'>
                <div>
                    <Image
                    src="/icons/bell.svg"
                    width={32}
                    height={32}
                    alt='notification svg'
                    className='invert cursor-pointer'
                    />

                </div>
                <div className='relative cursor-pointer'>
                    <Image 
                        src="/images/user.webp"
                        alt='user'
                        width={44}
                        height={44}

                        className='border rounded-full'
                    />
                </div>

            </div>
        </nav>
        
        

        

    </>
  )
}

export default Navbar
