import React from 'react'
import '../../style/home/SearchResult.css'

const SearchResult = ({ props }) => {
    return (
        <div
            className='search-result'
            onClick={(e) => {
                alert(`Redirecting to ${props.result.name}'s champion page... TO BE IMPLEMENTED`)
            }}
        >
            <img
                src={`../../assets/champion-icons/${props.result.label}.png`}
                alt={`../../assets/champion-icons/EMPTY_CHAMPION.png`}
                className='champion-icon'
            />
            <p>
                <span className='champion-name'>{props.result.name}</span>
            </p>
        </div>
    )
}

export default SearchResult