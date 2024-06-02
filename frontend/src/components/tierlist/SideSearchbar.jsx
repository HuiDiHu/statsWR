import React from 'react'
import { useState } from 'react'
import { allChampions } from 'src/constants'
import { FaMagnifyingGlass } from "react-icons/fa6";


const SideSearchbar = ({ props }) => {
    
    const handleRedirect = (name) => {
        alert(`Redirecting to ${name}'s champion page... TO BE IMPLEMENTED`);
    }

    const handleInputChange = (value) => {
        props.setInput(value);
        const result = props.roleIndex === 0 ? allChampions : allChampions.filter((champion) => {
            return champion && champion.label && champion.role.find((element) => {return element === Number(props.roleIndex)})
        });
        props.setFilteredChampions(result.filter((champion) => {
            return (
                !value ||
                champion && champion.name && champion.name.toLowerCase().startsWith(value.toLowerCase().trim())
            );
        }))
    }

    const handleSubmit = () => {
        props.filteredChampions.length > 0 && handleRedirect(props.filteredChampions[0].name)
    }

    return (
        <div className='my-2 bg-[#1e1e1e] rounded-md'>
            <div className='m-2 ml-3 flex items-center'>
                <FaMagnifyingGlass className='fill-neutral-500' />
                <input
                    className='h-5 w-10/12 ml-3 text-sm focus:outline-none'
                    placeholder='Search a Champion'
                    value={props.input}
                    onChange={(e) => { handleInputChange(e.target.value) }}
                    onKeyDown={(e) => {e.key === "Enter" && handleSubmit()}}
                />
            </div>
        </div>
    )
}

export default SideSearchbar