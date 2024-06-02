import React from 'react'
import Navbar from 'src/components/tierlist/Navbar'
import Footer from 'src/components/Footer'
import Body from 'src/components/tierlist/Body'

const Tierlist = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center'>
                <div className='flex flex-col w-3/4'>
                    <div className='h-[125px] my-2 rounded-xl bg-[#31313c]' />
                    <Body />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Tierlist