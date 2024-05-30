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
            {props.result.name}
        </div>
    )
}

export default SearchResult