import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Comment from './Comment'

const CommentList = ({ props }) => {
    const [loading, setLoading] = useState(false)
    const [skip, setSkip] = useState(0)
    const [comments, setComments] = useState([])

    useEffect(() => {
        //console.log("reloaded...")
        setLoading(true)
        axios
            .get(`http://localhost:5555/api/v1/comments/?champion=${props.label}`)
            .then((res) => {
                props.setSortedBy('Popular')
                setComments(res.data.comments)
                props.setN(res.data.comments.length)
                props.setMyComments([])
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }, [props.logged])

    useEffect(() => {
        if (comments) {
            if (props.sortedBy === 'Popular') {
                setComments([...comments].sort((a, b) => {
                    return a.upvotes.length - a.downvotes.length < b.upvotes.length - b.downvotes.length ? 1 : -1
                }))
            } else if (props.sortedBy === 'Recent') {
                setComments([...comments].sort((a, b) => {
                    return a.updatedAt < b.updatedAt ? 1 : -1
                }))
            }
        }
    }, [props.sortedBy])

    return (
        <div className='flex flex-col w-full'>
            {
                props.myComments.map((data) => (
                    <Comment key={data._id} props={{
                        data,
                        setN: props.setN,
                        setComments: props.setMyComments,
                        setLoginModal: props.setLoginModal,
                        setLogged: props.setLogged,
                        logged: props.logged
                    }} />
                ))
            }
            {
                comments && !loading &&
                comments.map((data) => (
                    <Comment key={data._id} props={{
                        data,
                        setN: props.setN,
                        setComments,
                        setLoginModal: props.setLoginModal,
                        setLogged: props.setLogged,
                        logged: props.logged
                    }} />
                ))
            }
        </div>
    )
}

export default CommentList