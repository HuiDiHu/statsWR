import React from 'react';
import SearchResult from './SearchResult';
import '../../style/home/SearchResultsList.css';

const SearchResultsList = ({ props }) => {
  return (
    <div className='results-list'>
        {props.searchResults.map((item, index) => (
            <SearchResult key={index} props={{result: item}} />
        ))}
    </div>
  )
}

export default SearchResultsList