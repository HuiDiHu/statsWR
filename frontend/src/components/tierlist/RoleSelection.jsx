import React from 'react'
import { useState } from 'react'
import LaneCard from './LaneCard'
import baronImg from '../../../public/assets/role-icons/baron-role-icon.png'
import bottomImg from '../../../public/assets/role-icons/bottom-role-icon.png'
import jungleImg from '../../../public/assets/role-icons/jungle-role-icon.png'
import midImg from '../../../public/assets/role-icons/mid-role-icon.png'
import supportImg from '../../../public/assets/role-icons/support-role-icon.png'
import allIconImg from '../../../public/assets/role-icons/all-icon.png'


const RoleSelection = ({ props }) => {
    return (
        <div className='mb-2 flex justify-center'>
            <LaneCard props={{
                input: props.input,
                style: 'flex justify-center items-center py-2 px-3 border border-neutral-500 rounded-l-lg',
                selectedStyle: 'flex justify-center items-center py-2 px-3 border border-[#5383e8] bg-[#5383e8] rounded-l-lg shadow',
                imgSrc: allIconImg,
                index: 0,
                selected: props.roleIndex === 0,
                setRoleIndex: props.setRoleIndex,
                setFilteredChampions: props.setFilteredChampions,
                setRoleFilteredChampions: props.setRoleFilteredChampions
            }} />
            <LaneCard props={{
                input: props.input,
                style: 'flex justify-center items-center py-2 px-3 border border-neutral-500',
                selectedStyle: 'flex justify-center items-center py-2 px-3 border border-[#5383e8] bg-[#5383e8] shadow',
                imgSrc: baronImg,
                index: 1,
                selected: props.roleIndex === 1,
                setRoleIndex: props.setRoleIndex,
                setFilteredChampions: props.setFilteredChampions,
                setRoleFilteredChampions: props.setRoleFilteredChampions
            }} />
            <LaneCard props={{
                input: props.input,
                style: 'flex justify-center items-center py-2 px-3 border border-neutral-500',
                selectedStyle: 'flex justify-center items-center py-2 px-3 border border-[#5383e8] bg-[#5383e8] shadow',
                imgSrc: jungleImg,
                index: 2,
                selected: props.roleIndex === 2,
                setRoleIndex: props.setRoleIndex,
                setFilteredChampions: props.setFilteredChampions,
                setRoleFilteredChampions: props.setRoleFilteredChampions
            }} />
            <LaneCard props={{
                input: props.input,
                style: 'flex justify-center items-center py-2 px-3 border border-neutral-500',
                selectedStyle: 'flex justify-center items-center py-2 px-3 border border-[#5383e8] bg-[#5383e8] shadow',
                imgSrc: midImg,
                index: 3,
                selected: props.roleIndex === 3,
                setRoleIndex: props.setRoleIndex,
                setFilteredChampions: props.setFilteredChampions,
                setRoleFilteredChampions: props.setRoleFilteredChampions
            }} />
            <LaneCard props={{
                input: props.input,
                style: 'flex justify-center items-center py-2 px-3 border border-neutral-500',
                selectedStyle: 'flex justify-center items-center py-2 px-3 border border-[#5383e8] bg-[#5383e8] shadow',
                imgSrc: bottomImg,
                index: 4,
                selected: props.roleIndex === 4,
                setRoleIndex: props.setRoleIndex,
                setFilteredChampions: props.setFilteredChampions,
                setRoleFilteredChampions: props.setRoleFilteredChampions
            }} />
            <LaneCard props={{
                input: props.input,
                style: 'flex justify-center items-center py-2 px-3 border border-neutral-500 rounded-r-lg',
                selectedStyle: 'flex justify-center items-center py-2 px-3 border border-[#5383e8] bg-[#5383e8] rounded-r-lg shadow',
                imgSrc: supportImg,
                index: 5,
                selected: props.roleIndex === 5,
                setRoleIndex: props.setRoleIndex,
                setFilteredChampions: props.setFilteredChampions,
                setRoleFilteredChampions: props.setRoleFilteredChampions
            }} />
        </div>
    )
}

export default RoleSelection