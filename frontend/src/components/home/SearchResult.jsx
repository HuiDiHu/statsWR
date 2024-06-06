import React from 'react'
import 'src/style/home/SearchResult.css'
import { useNavigate } from 'react-router-dom'

const SearchResult = ({ props }) => {
    const navigate = useNavigate()
    const handleRedirect = (label) => {
        if (!label || label === 'CHAMPION NOT FOUND') {
            alert('CHAMPION NOT FOUND')
            return
        }
        navigate(`/champion/${label}`, { state: { retAddr: '/' } })
    }

    return (
        <div
            className='search-result'
            onClick={(e) => handleRedirect(props.result.label)}
        >
            <img
                src={`assets/champion-icons/${props.result.label}.png`}
                alt={`assets/champion-icons/EMPTY_CHAMPION.png`}
                className='champion-icon'
            />
            <p className='truncate'>
                <span className='champion-name'>{props.result.name}</span>
            </p>
        </div>
    )
}

export default SearchResult