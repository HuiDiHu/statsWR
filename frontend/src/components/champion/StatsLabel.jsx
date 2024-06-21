import React from 'react'

const StatsLabel = ({ props }) => {
    return (
        <div className='flex flex-col items-center max-w-fit'>
            <div className='flex items-center py-4 bg-gradient-to-r from-orange-500 to-orange-800 rounded-lg text-center h-20 lg:h-24 border-2 border-[#1e1e1e]'>
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8 border border-l-0 border-y-0 border-[#1e1e1e]'>
                    <span className='font-bold'>{props.rank}</span>
                    <span>Rank</span>
                </div>
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8 border border-y-0 border-[#1e1e1e]'>
                    <span className='font-bold'>{props.tier}</span>
                    <span>Tier</span>
                </div>
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8 border border-y-0 border-[#1e1e1e]'>
                    <span className='font-bold'>{props.winRate}%</span>
                    <span>Winrate</span>
                </div>
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8 border border-y-0 border-[#1e1e1e]'>
                    <span className='font-bold'>{props.pickRate}%</span>
                    <span>Pickrate</span>
                </div>
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8 border border-r-0 border-y-0 border-[#1e1e1e]'>
                    <span className='font-bold'>{props.banRate}%</span>
                    <span>Banrate</span>
                </div>
            </div>
        </div>
    )
}

export default StatsLabel