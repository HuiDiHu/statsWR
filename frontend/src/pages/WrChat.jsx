import { useState } from 'react';

import Navbar from 'src/components/Navbar' 
import Footer from 'src/components/Footer'
import LoginModal from 'src/components/LoginModal';
import SignupModal from 'src/components/SignupModal';
import ChatForm from "src/components/wrChat/ChatForm"
import { ChatTooltipProvider } from "src/components/wrChat/ChatTooltip"


const WrChat = ({ props }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <Navbar props={{
                titleHidden: false,
                label: 'ChatWR',
                loginModal, signupModal, setLoginModal, setSignupModal, 
                isLogged: props.isLogged,
                setLogged: props.setLogged
            }} />
            {loginModal && <LoginModal onClose={() => setLoginModal(false)} props={{ setLoginModal, setSignupModal, setLogged: props.setLogged }} />}
            {signupModal && <SignupModal onClose={() => setSignupModal(false)} props={{ setLoginModal, setSignupModal, setLogged: props.setLogged }} />}
            <div className='flex grow'>
                <ChatTooltipProvider delayDuration={0}>
                    <ChatForm setLoginModal={setLoginModal} setLogged = {props.setLogged} />
                </ChatTooltipProvider>
            </div>
        </div>
    )
}

export default WrChat