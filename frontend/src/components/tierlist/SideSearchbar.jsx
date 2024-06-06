import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const SideSearchbar = ({ props }) => {
    const navigate = useNavigate()
    const handleRedirect = (label) => {
        if (!label || label === 'CHAMPION NOT FOUND') {
            alert('CHAMPION NOT FOUND')
            return;
        }
        navigate(`/champion/${label}`, { state: { retAddr: '/tierlist' } })
    }

    return (
        <div className='my-2 bg-[#1e1e1e] rounded-md'>
            <div className='m-2 ml-3 flex items-center'>
                <FaMagnifyingGlass className='fill-neutral-500' />
                <input
                    className='h-5 w-10/12 ml-3 text-xs lg:text-sm focus:outline-none'
                    placeholder='Search a Champion'
                    value={props.input}
                    onChange={(e) => { props.setInput(e.target.value) }}
                    onKeyDown={(e) => {
                        e.key === "Enter" &&
                            props.filteredChampions.length > 0 &&
                            handleRedirect(props.filteredChampions[0].label)
                    }}
                />
            </div>
        </div>
    )
}

export default SideSearchbar