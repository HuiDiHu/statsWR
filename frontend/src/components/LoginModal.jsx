import { useState } from "react"
import axios from 'axios'
import logo from 'assets/logo.png'
import { Link } from "react-router-dom"

const LoginModal = ({ onClose, props }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    const handleLoginSubmit = () => {
        setLoading(true)
        axios
            .post('http://localhost:5555/api/v1/auth/login', { email, password })
            .then((res) => {
                props.setLoginModal(false)
                setErrMsg(""); setEmail(""); setPassword("");
                window.sessionStorage.setItem('token', res.data.token)
                window.sessionStorage.setItem('userID', res.data.user.id)
                window.sessionStorage.setItem('username', res.data.user.username)
                window.sessionStorage.setItem('profile', res.data.user.profile)

                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setErrMsg(error.response ? error.response.data.msg : '')
                setLoading(false)
            })
    }

    const handleForgotPasswordSubmit = () => {
        alert('Feature have yet to be implemented...')
    }
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                className="relative w-[45%] h-[550px] bg-[#31313c] rounded-3xl flex flex-col justify-between items-center py-2"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    e.key === "Enter" &&
                        handleLoginSubmit()
                }}
            >
                <div className="w-[40%] h-[10%] m-5 shadow-[0_3px_5px_0_rgba(0,0,0,0.5)] flex justify-center items-center">
                    <span className="text-2xl">Log In</span>
                </div>
                <div className="flex flex-col items-center justify-center h-[30%] w-full">
                    <div className="flex w-full h-[50%] items-center justify-center my-3">
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
                    <div className="flex w-full h-[50%] items-center justify-center mt-3">
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
                <div className="w-full h-[35%] flex flex-col items-center justify-end">
                    <button
                        className="w-[30%] h-[30%] rounded-xl m-4 my-2 bg-gradient-to-r from-orange-500 to-orange-800 flex justify-center items-center shadow-[1px_3px_5px_0_rgba(0,0,0,0.5)]"
                        onClick={handleLoginSubmit}
                    >
                        <span className="text-xl">Log In</span>
                    </button>
                    <button
                        className="w-[30%] h-[30%] rounded-xl m-4 mb-7 bg-gradient-to-r from-orange-500 to-orange-800 flex justify-center items-center shadow-[1px_3px_5px_0_rgba(0,0,0,0.5)]"
                        onClick={handleForgotPasswordSubmit}
                    >
                        <span className="text-xl">Forgot Password?</span>
                    </button>
                </div>
                {loading && <img className="h-12 w-12 lg:h-14 lg:w-14 absolute bottom-5 right-5 lg:bottom-10 lg:right-10 animate-spin" src={logo}/>}
                <p className="text-xs absolute bottom-5 left-5">
                    <span>Need an account?{' '}</span>
                    <span 
                        className="text-sky-600 cursor-pointer"
                        onClick={() => {
                            props.setLoginModal(false);
                            props.setSignupModal(true);
                        }}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginModal