import React from 'react'
import IconAndRoles from './IconAndRoles'
import StatsLabel from './StatsLabel'
import Graphs from './Graphs'

const Body = ({ props }) => {
  return (
    <div className='flex flex-col items-center w-[70%] bg-blue-700'>
        <IconAndRoles />
        <StatsLabel />
        <Graphs />
    </div>
  )
}

export default Body