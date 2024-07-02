import React, { useState } from 'react'
import Navbar from 'src/components/Navbar'
import Footer from 'src/components/Footer'
import Body from 'src/components/tierlist/Body'
import logo from 'assets/logo.png'
import LoginModal from 'src/components/LoginModal';
import SignupModal from 'src/components/SignupModal';

const Tierlist = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);

    return (
        <div>
            <Navbar props={{
                titleHidden: false,
                label: 'Tier List',
                loginModal, signupModal, setLoginModal, setSignupModal
            }} />
            {loginModal && <LoginModal onClose={() => setLoginModal(false)} props={{setLoginModal}} />}
            {signupModal && <SignupModal onClose={() => setSignupModal(false)} props={{setSignupModal}} />}
            <div className='relative flex flex-col'>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col w-3/4'>
                        <div className='h-[125px] my-2 rounded-xl bg-[#31313c]' />
                        <Body />
                    </div>
                </div>
                <img
                    className='fixed bottom-10 right-10 h-12 w-12 hover:h-14 hover:w-14 hover:bottom-9 hover:right-9 ease-in-out duration-200'
                    onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                    src={logo}
                    alt=''
                />
            </div>
            <Footer />
        </div>
    )
}

export default Tierlist