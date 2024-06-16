import React from 'react'

const StatsLabel = ({ props }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-center py-4 bg-green-800 rounded-lg text-center h-24'>
                <div className=' flex flex-col px-8'>
                    <span>1/26</span>
                    <span>Rank</span>
                </div>
                <div className='flex flex-col px-8'>
                    <span>A</span>
                    <span>Tier</span>
                </div>
                <div className='flex flex-col px-8'>
                    <span>49.55%</span>
                    <span>Winrate</span>
                </div>
                <div className='flex flex-col px-8'>
                    <span>19.69%</span>
                    <span>Pickrate</span>
                </div>
                <div className='flex flex-col px-8'>
                    <span>4.20%</span>
                    <span>Banrate</span>
                </div>
            </div>
        </div>
    )
}

export default StatsLabel