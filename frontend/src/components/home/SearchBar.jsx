import React from 'react'
import { useState } from 'react'
import '../../style/home/SearchBar.css'
import { allChampions } from '../../constants'

const SearchBar = ({ props }) => {
  const [input, setInput] = useState("")
  const handleChange = (value) => {
    setInput(value);
    //usually results should be already filtered in the backend after the fetch/axois request
    //will implement this later
    const results = allChampions.filter((champion) => {
      return (
        value && 
        champion && 
        champion.name && 
        champion.name.toLowerCase().includes(value.toLowerCase().trim()));
    })
    props.setSearchResults(results)
  }

  return (
    <div className='input-wrapper'>
      <input className='input' placeholder='Search Champion...' value={input} onChange={(e) => {
        handleChange(e.target.value)
      }}/>
    </div>
  )
}

export default SearchBar