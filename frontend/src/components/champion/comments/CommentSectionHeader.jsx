import React, { useState, useRef } from 'react'
import axios from 'axios'
const defaultProfile = 'EMPTY_CHAMPION'

const CommentSectionHeader = ({ props }) => {
    const [commentText, setCommentText] = useState("")
    const textRef = useRef()

    const handleSubmit = () => {
        if (!commentText) return;
        if (commentText.length > 500) {
            alert('Comment has exceeded the 500 character limit!')
            return;
        }
        axios
            .create({
                baseURL: import.meta.env.VITE_SERVER_URL,
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
                }
            })
            .post(`/api/v1/comments/create/?champion=${props.label}`,
                {
                    text: commentText.trim().replaceAll('\n', '\\n')
                }
            )
            .then((res) => {
                props.setMyComments(prev => {
                    return [res.data.comment, ...prev]
                })
                props.setN(prev => prev + 1)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    window.sessionStorage.removeItem('token'); window.sessionStorage.removeItem('username'); window.sessionStorage.removeItem('profile'); window.sessionStorage.removeItem('userID'); 
                    props.setLoginModal(true); props.setLogged(false);
                }
            })
        
        textRef.current.style.height = '40px'
        setCommentText("")
    }

    return (
        <div className='w-full rounded-t-xl bg-[#31313c] border border-x-0 border-t-0'>
            <div className='p-3 border border-[#1e1e1e] border-x-0 border-t-0'>
                <h2 className='text-sm'>
                    <span className='font-bold'>{props.name}</span>
                    <span>{" "}Discussion Forum {`(${props.n})`}</span>
                </h2>
            </div>
            <div className='p-3 px-2 flex'>
                <img
                    className='h-14 w-14 rounded-xl mr-2'
                    src={`../../../../assets/misc/profile/${window.sessionStorage.getItem('profile') ? window.sessionStorage.getItem('profile') : defaultProfile}.png`}
                    alt='/'
                />
                <div className='w-[95%] flex flex-col rounded-xl border-2 bg-[#2d2d2d]'>
                    <div className='w-full pl-3 pt-3 pr-0.5 rounded-t-xl border-2 border-x-0 border-t-0'>
                        <textarea
                            className='min-h-10 max-h-28 w-full resize-none text-sm bg-[#2d2d2d] outline-none cursor-text'
                            placeholder={` Share something interesting about ${props.name}...`}
                            ref={textRef}
                            onChange={(e) => {
                                setCommentText(e.target.value)
                                textRef.current.style.height = 'auto'
                                textRef.current.style.height = `${textRef.current.scrollHeight}px`
                            }}
                            value={commentText}
                        />
                    </div>
                    <div className='relative flex justify-end w-full p-2 space-x-5'>
                        <span className={`${commentText.length > 500 ? 'text-red-600' : ''} absolute left-3 top-3 text-xs`}>
                            {commentText.length}/500
                        </span>
                        <button
                            className={`${!commentText ? 'border-gray-400 text-gray-400 cursor-auto' : 'cursor-pointer'} text-sm rounded-full py-1 px-3 border-2`}
                            onClick={() => {
                                if (commentText) {
                                    setCommentText("")
                                    textRef.current.style.height = '40px'
                                }
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${!commentText ? 'grayscale-[65%] cursor-auto' : 'cursor-pointer'} text-sm rounded-full py-1 px-3 bg-gradient-to-r from-orange-500 to-orange-800`}
                            onClick={handleSubmit}
                        >
                            Comment
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex w-full m-4 space-x-5'>
                <button
                    className={`${props.sortedBy === 'Popular' ? '' : 'opacity-60'} text-xs w-16 h-6 flex items-center justify-center rounded-md bg-gradient-to-r from-[#d9c49a] to-[#4e432a]`}
                    onClick={() => { props.setSortedBy('Popular') }}
                >
                    Popular
                </button>
                <button
                    className={`${props.sortedBy === 'Recent' ? '' : 'opacity-60'} text-xs w-16 h-6 flex items-center justify-center rounded-md bg-gradient-to-r from-[#d9c49a] to-[#4e432a]`}
                    onClick={() => { props.setSortedBy('Recent') }}
                >
                    Recent
                </button>
            </div>
        </div>
    )
}

export default CommentSectionHeader