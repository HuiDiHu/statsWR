import React, { useState, useEffect, useRef } from 'react'
import TimeAgo from 'react-timeago'
import { BiSolidUpvote } from "react-icons/bi"
import { BiSolidDownvote } from "react-icons/bi"
import { IoTrashOutline } from "react-icons/io5";
import { MdReportGmailerrorred } from "react-icons/md";
import { useSnackbar } from 'notistack'
import axios from 'axios'

const Comment = ({ props }) => {
    const [show, setShow] = useState('')
    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)
    const [cumulativeCount, setCumulativeCount] = useState(props.data.upvotes.length - props.data.downvotes.length)
    const { enqueueSnackbar } = useSnackbar()
    const [reported, setReported] = useState(props.data.reports.includes(window.sessionStorage.getItem('userID')));

    //this seems completely useless but CommentSection breaks without it :/
    useEffect(() => {
        setShow('Read more')
        setUpvote(props.data.upvotes.includes(window.sessionStorage.getItem('userID')))
        setDownvote(props.data.downvotes.includes(window.sessionStorage.getItem('userID')))
    }, [props.data._id, props.logged])

    //buggy because signout doesn't cause rerender of Comment
    useEffect(() => {
        if (!window.sessionStorage.getItem('token')) {
            setUpvote(false)
            setDownvote(false)
            setCumulativeCount(props.data.upvotes.length - props.data.downvotes.length)
        }
    })

    const handleVote = (voteType) => {
        let upvoteQuery = null; let downvoteQuery = null;
        if (voteType === 'upvote') {
            if (!upvote) {
                upvoteQuery = true
                if (downvote) { downvoteQuery = false }
            } else { upvoteQuery = false }
        } else {
            if (!downvote) {
                downvoteQuery = true
                if (upvote) { upvoteQuery = false }
            } else { downvoteQuery = false }
        }
        axios
            .create({
                baseURL: import.meta.env.VITE_SERVER_URL,
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
                }
            })
            .put(`/api/v1/comments/${props.data._id}`, {
                upvote: upvoteQuery,
                downvote: downvoteQuery
            })
            .then((res) => {
                if (upvoteQuery !== null) setUpvote(upvoteQuery)
                if (downvoteQuery !== null) setDownvote(downvoteQuery)
                setCumulativeCount(res.data.comment.upvotes.length - res.data.comment.downvotes.length)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    window.sessionStorage.removeItem('token'); window.sessionStorage.removeItem('username'); window.sessionStorage.removeItem('profile'); window.sessionStorage.removeItem('userID');
                    props.setLoginModal(true); props.setLogged(false)
                }
            })
    }

    const handleDelete = () => {
        axios
            .create({
                baseURL: import.meta.env.VITE_SERVER_URL,
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
                }
            })
            .delete(`/api/v1/comments/${props.data._id}`)
            .then((res) => {
                props.setComments(comments => (
                    comments.filter((item) => item._id !== props.data._id)
                ))
                props.setN(prev => prev - 1)
                enqueueSnackbar('Comment deleted successfully', { variant: 'success' })
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    window.sessionStorage.removeItem('token'); window.sessionStorage.removeItem('username'); window.sessionStorage.removeItem('profile'); window.sessionStorage.removeItem('userID');
                    props.setLoginModal(true); props.setLogged(false)
                } else {
                    enqueueSnackbar('Error', { variant: 'error' })
                }
            })
    }

    const handleReport = () => {
        axios
            .create({
                baseURL: import.meta.env.VITE_SERVER_URL,
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
                }
            })
            .put(`/api/v1/comments/report/${props.data._id}`, { report: !reported })
            .then((res) => {
                if (!reported) {
                    props.setComments(comments => (
                        comments.filter((item) => item._id !== props.data._id)
                    ))
                    props.setN(prev => prev - 1)
                } else {
                    setReported(prev => { !prev })
                }
                enqueueSnackbar('Updated report status successfully', { variant: 'success' })
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    window.sessionStorage.removeItem('token'); window.sessionStorage.removeItem('username'); window.sessionStorage.removeItem('profile'); window.sessionStorage.removeItem('userID');
                    props.setLoginModal(true); props.setLogged(false)
                } else {
                    enqueueSnackbar('Error', { variant: 'error' })
                }
            })
    }
    const textRef = useRef()
    return (
        <div className='relative flex w-full p-4 bg-[#31313c] border-b border-[#1e1e1e]'>
            <img
                className='h-14 w-14 rounded-full mr-5'
                src={`../../../../assets/misc/profile/${props.data.user.profile}.png`}
            />
            <div className='w-[75%] flex flex-col'>
                <h6 className='space-x-3'>
                    <span className='text-sm'>@{props.data.user.username}</span>
                    <span className='text-xs opacity-60'><TimeAgo date={new Date(props.data.createdAt)} /></span>
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
                        onClick={() => { handleVote('upvote') }}
                    />
                    <span>{cumulativeCount}</span>
                    <BiSolidDownvote
                        className={`${downvote ? 'text-orange-600' : ''} w-5 h-5 cursor-pointer`}
                        onClick={() => { handleVote('downvote') }}
                    />
                </div>
            </div>
            {window.sessionStorage.getItem('userID') === props.data.user.userID && <IoTrashOutline
                className='absolute lg:bottom-3 lg:-right-6 lg:w-5 lg:h-5 bottom-2 -right-4 w-4 h-4 hover:text-red-600 pointer-events-auto cursor-pointer'
                onClick={handleDelete}
            />}
            {window.sessionStorage.getItem('userID') !== props.data.user.userID && <MdReportGmailerrorred
                className={`absolute lg:top-3 lg:-right-[27px] lg:w-6 lg:h-6 top-2 -right-[19px] w-5 h-5 ${reported ? 'text-red-600 hover:text-white' : 'text-white hover:text-red-600'} pointer-events-auto cursor-pointer`}
                onClick={handleReport}
            />}
        </div>
    )
}

export default Comment