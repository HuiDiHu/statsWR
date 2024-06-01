import React from 'react'
import '../../style/home/SearchResult.css'

const SearchResult = ({ props }) => {
    const handleRedirect = (name) => {
        alert(`Redirecting to ${name}'s champion page... TO BE IMPLEMENTED`);
    }

    return (
        <div
            className='search-result'
            onClick={(e) => handleRedirect(props.result.name)}
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