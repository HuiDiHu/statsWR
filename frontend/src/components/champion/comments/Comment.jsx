import React, { useState, useEffect, useRef } from 'react'
import TimeAgo from 'react-timeago'
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

const Comment = ({ props }) => {
    const [show, setShow] = useState('')
    const [dummy, setDummy] = useState(false)
    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)
    const [cumulativeCount, setCumulativeCount] = useState(props.data.upvotes.length - props.data.downvotes.length)
    useEffect(() => {
        setShow('Read more')
        setDummy(prevDummy => { return !prevDummy })
    }, [props.data._id])
    useEffect(() => {
        if (!window.sessionStorage.getItem('userID')) {
            setUpvote(false)
            setDownvote(false)
            setCumulativeCount(props.data.upvotes.length - props.data.downvotes.length)
        }
    })
    const handleUpvotes = () => {
        if (!window.sessionStorage.getItem('userID')) {
            props.setLoginModal(true)
            return;
        }
        if (!upvote) {
            setUpvote(true)
            setCumulativeCount(prev => {return prev+1})
            //TODO: axios include upvote
            if (downvote) {
                setDownvote(false)
                setCumulativeCount(prev => {return prev+1})
                //TODO: axios remove downvote
            }
        } else {
            setUpvote(false)
            setCumulativeCount(prev => {return prev-1})
            //TODO: axios remove upvote
        }
    }

    const handleDownvotes = () => {
        if (!window.sessionStorage.getItem('userID')) {
            props.setLoginModal(true)
            return;
        }
        if (!downvote) {
            setDownvote(true)
            setCumulativeCount(prev => {return prev-1})
            //TODO: axios include downvote
            if (upvote) {
                setUpvote(false)
                setCumulativeCount(prev => {return prev-1})
                //TODO: axios remove upvote
            }
        } else {
            setDownvote(false)
            setCumulativeCount(prev => {return prev+1})
        }
    }

    const textRef = useRef()
    return (
        <div className='flex w-full p-4 bg-[#31313c] border-b border-[#1e1e1e]'>
            <img
                className='h-14 w-14 rounded-full mr-5'
                src={`../../../../assets/misc/profile/${props.data.user.profile}.png`}
            />
            <div className='w-[75%] flex flex-col'>
                <h6 className='space-x-3'>
                    <span className='text-sm'>@{props.data.user.username}</span>
                    <span className='text-xs opacity-60'><TimeAgo date={props.data.updatedAt} /></span>
                </h6>
                <div className='flex flex-col w-full rounded-xl border p-2 pointer-events-none'>
                    <p ref={textRef} className={`${show === 'Read more' ? 'max-h-16 overflow-y-hidden' : 'h-auto'} text-sm text-wrap break-words pointer-events-auto`}>
                        {props.data.text.split('\\n').map((subStr, index) => (
                            <span key={index}>
                                {subStr}
                                <br />
                            </span>
                        ))}
                    </p>

                    <span
                        className={`${(textRef.current && textRef.current.clientHeight < 64) ? 'hidden' : ''} text-xs cursor-pointer opacity-60 mt-1 pointer-events-auto w-[72px]`}
                        onClick={() => {
                            setShow(prevShow => {
                                return prevShow === 'Read more' ? 'Show less' : 'Read more'
                            })
                        }}
                    >
                        {show}
                    </span>
                </div >
            </div>
            <div className='flex grow justify-end'>
                <div className='flex flex-col items-center'>
                    <BiSolidUpvote 
                        className={`${upvote ? 'text-orange-600' : ''} w-5 h-5 cursor-pointer`}
                        onClick={handleUpvotes}
                    />
                    <span>{cumulativeCount}</span>
                    <BiSolidDownvote 
                        className={`${downvote ? 'text-orange-600' : ''} w-5 h-5 cursor-pointer`}
                        onClick={handleDownvotes}
                    />
                </div>
            </div>
        </div>
    )
}

export default Comment