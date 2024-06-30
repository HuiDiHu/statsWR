import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import logo from 'assets/logo.png'
import Navbar from 'src/components/Navbar'
import Body from 'src/components/champion/Body'
import Footer from 'src/components/Footer'
import LoginModal from 'src/components/LoginModal';
import SignupModal from 'src/components/SignupModal';


const Champion = () => {
    const { id: championLabel } = useParams()
    const location = useLocation()
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    /*
        0. Navbar?
        { Body
            1. Icon/roles
            2. Rank, tier, WR, PR, BR
            3. 4 Graphs
            4. Ability video
            5. Ability icon
            6. Ability description
        }
        7. Footer  
    */
    return (
        <div className='relative'>
            <Navbar props={{
                    titleHidden: false,
                    label: 'Champion',
                    loginModal, signupModal, setLoginModal, setSignupModal
                }}
            />
            {loginModal && <LoginModal onClose={() => setLoginModal(false)}/>}
            {signupModal && <SignupModal onClose={() => setSignupModal(false)}/>}
            {location.state ?
                <Body props={{ 
                    label: location.state.champLabel, 
                    defaultRole: location.state.role ? location.state.role : undefined,
                    retAddr: location.state ? location.state.retAddr : '/'
                }} />
                :
                <div className='text-center text-4xl text-red-600 mt-20'> SOMETHING WENT WRONG... PLEASE GO BACK</div>
            }
            <img
                className='fixed z-0 bottom-10 right-10 h-12 w-12 hover:h-14 hover:w-14 hover:bottom-9 hover:right-9 ease-in-out duration-200'
                onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                src={logo}
                alt=''
            />
            <Footer />
        </div>
    )
}

export default Champion