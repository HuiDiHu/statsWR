import { useState } from "react"
import axios from 'axios'
import logo from 'assets/logo.png'

const SignupModal = ({ onClose, props }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    const handleSignupSubmit = () => {
        setLoading(true)
        axios
            .post('http://localhost:5555/api/v1/auth/register', { email, username, password })
            .then((res) => {
                props.setSignupModal(false)
                setErrMsg(""); setEmail(""); setUsername(""); setPassword("");
                window.sessionStorage.setItem('token', res.data.token)
                window.sessionStorage.setItem('userID', res.data.user.id)
                window.sessionStorage.setItem('username', res.data.user.username)
                window.sessionStorage.setItem('profile', res.data.user.profile)

                setLoading(false)
            })
            .catch((error) => {
                const temp = error.response.data.msg.split(',')[0]
                switch(temp) {
                    case "Duplicate value entered for email field":
                        setErrMsg("User with this email already exist.")
                        break;
                    default:
                        setErrMsg(temp)
                }
                setLoading(false)
            })
    }

    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                className="relative w-[45%] h-[550px] bg-[#31313c] rounded-3xl flex flex-col justify-between items-center py-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-[40%] h-[10%] m-5 shadow-[0_3px_5px_0_rgba(0,0,0,0.5)] flex justify-center items-center">
                    <span className="text-2xl">Sign Up</span>
                </div>
                <div className="flex flex-col items-center justify-center h-[45%] w-full">
                    <div className="flex w-full h-[33%] items-center justify-center my-3">
                        <div className="w-[30%] h-full flex items-center justify-center">
                            <span className="text-xl">Email:</span>
                        </div>
                        <div className="w-[50%] h-full flex items-center justify-center rounded-xl border border-white">
                            <input
                                className="bg-transparent text-xl w-[90%] outline-none"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full h-[33%] items-center justify-center my-3">
                        <div className="w-[30%] h-full flex items-center justify-center">
                            <span className="text-xl">Username:</span>
                        </div>
                        <div className="w-[50%] h-full flex items-center justify-center rounded-xl border border-white">
                            <input
                                className="bg-transparent text-xl w-[90%] outline-none"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full h-[33%] items-center justify-center my-3">
                        <div className="w-[30%] h-full flex items-center justify-center">
                            <span className="text-xl">Password:</span>
                        </div>
                        <div className="w-[50%] h-full flex items-center justify-center rounded-xl border border-white">
                            <input
                                className="bg-transparent text-xl w-[90%] outline-none"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-[5%]">
                    <span className={`text-red-600 flex items-start justify-center`}>{errMsg}</span>
                </div>
                <div className="w-full h-[35%] flex flex-col items-center justify-center">
                    <button
                        className="w-[30%] h-[30%] rounded-xl m-4 mb-7 bg-gradient-to-r from-orange-500 to-orange-800 flex justify-center items-center shadow-[1px_3px_5px_0_rgba(0,0,0,0.5)]"
                        onClick={handleSignupSubmit}
                    >
                        <span className="text-xl">Sign Up</span>
                    </button>
                </div>
                {loading && <img className="h-12 w-12 lg:h-14 lg:w-14 absolute bottom-5 right-5 lg:bottom-10 lg:right-10 animate-spin" src={logo}/>}
                <p className="text-xs absolute bottom-5 left-5">
                    <span>Already have an account?{' '}</span>
                    <span 
                        className="text-sky-600 cursor-pointer"
                        onClick={() => {
                            props.setSignupModal(false);
                            props.setLoginModal(true);
                        }}
                    >
                        Log In
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignupModal