import React from 'react'
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { GoDash } from "react-icons/go";

const diffChecker = (label, diff) => {
    diff = diff.toFixed(2)
    if (diff > 0) {
        return (
            <div className='flex justify-end pr-2 items-center rounded-md bg-green-500 bg-opacity-80 mb-1'>
                <GoTriangleUp className='w-5 h-5' />
                <span>{label === 'rank' ? 1 * diff : diff}{label !== 'rank' && "%"}</span>
            </div>
        )
    } else if (diff < 0) {
        return (
            <div className='flex justify-end pr-2 items-center rounded-md bg-red-500 bg-opacity-80 mb-1'>
                <GoTriangleDown className='w-5 h-5' />
                <span>{label === 'rank' ? -1 * diff : diff.toString().substring(1)}{label !== 'rank' && "%"}</span>
            </div>
        )
    } else {
        return (
            <div className='flex justify-end pr-2 items-center rounded-md bg-zinc-500 bg-opacity-80 mb-1'>
                <GoDash className='w-5 h-5' />
                <span>{label === 'rank' ? '0' : '0.00'}{label !== 'rank' && "%"}</span>
            </div>
        )
    }
}

const StatsLabel = ({ props }) => {
    return (
        <div className='flex flex-col items-center max-w-fit'>
            <div className='flex items-center py-4 bg-gradient-to-r from-orange-500 to-orange-800 rounded-lg text-center h-20 lg:h-24'>
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8'>
                    <span className='font-bold text-xl'>{props.tier}</span>
                    <span>Tier</span>
                </div>
                <div className='h-[90%] border' />
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8'>
                    {props.rank && props.prevRank && diffChecker('rank', -1.00 * (Number(props.rank.split('/')[0]) - Number(props.prevRank.split('/')[0])))}
                    <span className='font-bold'>{props.rank}</span>
                    <span>Rank</span>
                </div>
                <div className='h-[90%] border' />
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8'>
                    {props.winRate && props.prevWinRate && diffChecker('winRate', Number(props.winRate) - Number(props.prevWinRate))}
                    <span className='font-bold'>{props.winRate}%</span>
                    <span>Winrate</span>
                </div>
                <div className='h-[90%] border' />
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8'>
                    {props.pickRate && props.prevPickRate && diffChecker('pickRate', Number(props.pickRate) - Number(props.prevPickRate))}
                    <span className='font-bold'>{props.pickRate}%</span>
                    <span>Pickrate</span>
                </div>
                <div className='h-[90%] border' />
                <div className='text-xs lg:text-base flex flex-col px-4 lg:px-8'>
                    {props.banRate && props.prevBanRate && diffChecker('pickRate', Number(props.banRate) - Number(props.prevBanRate))}
                    <span className='font-bold'>{props.banRate}%</span>
                    <span>Banrate</span>
                </div>
            </div>
        </div>
    )
}

export default StatsLabel