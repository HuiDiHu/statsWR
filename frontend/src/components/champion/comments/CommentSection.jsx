import React, { useState } from 'react'
import CommentSectionHeader from 'src/components/champion/comments/CommentSectionHeader'
import CommentList from 'src/components/champion/comments/CommentList'

const CommentSection = ({ props }) => {
    const [sortedBy, setSortedBy] = useState('Popular')
    const [n, setN] = useState(0)
    const [myComments, setMyComments] = useState([])

    return (
        <div className='flex w-full justify-center mt-1'>
            <div className='relative w-[500px] lg:w-[790px] flex flex-col'>
                <CommentSectionHeader props={{
                    name: props.name,
                    label: props.label,
                    setLogged: props.setLogged,
                    n,sortedBy, setSortedBy, setMyComments,
                    setLoginModal: props.setLoginModal,
                }} />
                <CommentList props={{
                    label: props.label,
                    setLogged: props.setLogged,
                    logged: props.logged,
                    setN,
                    sortedBy, setSortedBy,
                    myComments, setMyComments,
                    setLoginModal: props.setLoginModal,
                }} />
                <div className='w-full bg-[#31313c] rounded-b-xl h-10'>

                </div>
            </div>
        </div>
    )
}

export default CommentSection