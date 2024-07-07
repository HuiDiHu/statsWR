import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import logo from 'assets/logo.png'
import Navbar from 'src/components/Navbar'
import Body from 'src/components/champion/Body'
import CommentSection from 'src/components/champion/comments/CommentSection'
import Footer from 'src/components/Footer'
import LoginModal from 'src/components/LoginModal';
import SignupModal from 'src/components/SignupModal';


const Champion = ({ props }) => {
    const { id: championLabel } = useParams()
    const location = useLocation()
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [name, setName] = useState("")
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
                loginModal, signupModal, setLoginModal, setSignupModal,
                setLogged: props.setLogged
            }}
            />
            {loginModal && <LoginModal onClose={() => setLoginModal(false)} props={{ setLoginModal, setSignupModal, setLogged: props.setLogged }} />}
            {signupModal && <SignupModal onClose={() => setSignupModal(false)} props={{ setLoginModal, setSignupModal, setLogged: props.setLogged }} />}
            {location.state ?
                <Body props={{
                    label: championLabel,
                    defaultRole: location.state.role ? location.state.role : undefined,
                    retAddr: location.state ? location.state.retAddr : '/',
                    name, setName
                }} />
                :
                <div className='text-center text-4xl text-red-600 mt-20'> SOMETHING WENT WRONG... PLEASE GO BACK</div>
            }

            {location.state && <CommentSection props={{
                label: championLabel,
                name, setLoginModal, setSignupModal,
                setLogged: props.setLogged,
                logged: props.logged
            }} />}
            <img
                className='fixed z-0 bottom-6 right-2 h-8 w-8 hover:h-9 hover:w-9 hover:bottom-5 hover:right-1 lg:bottom-10 lg:right-10 lg:h-12 lg:w-12 hover:lg:h-14 hover:lg:w-14 hover:lg:bottom-9 hover:lg:right-9 ease-in-out duration-200'
                onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                src={logo}
                alt=''
            />
            <Footer />
        </div>
    )
}

export default Champion