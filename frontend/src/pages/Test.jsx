import React, { useState } from 'react'
import CommentSectionHeader from 'src/components/champion/comments/CommentSectionHeader'
import CommentList from 'src/components/champion/comments/CommentList'

const Test = () => {
  const [sortedBy, setSortedBy] = useState('Popular')

  return (
    <div className='flex w-full justify-center'>
      <div className='relative w-[500px] lg:w-[790px] flex flex-col'>
        <br /><br /><br />
        <CommentSectionHeader props={{
          label: "AATROX",
          name: "Aatrox",
          n: 69,
          setSortedBy
        }} />
        <CommentList props={{
          label: "AATROX"
        }}/>
      </div>
    </div>
  )
}

export default Test