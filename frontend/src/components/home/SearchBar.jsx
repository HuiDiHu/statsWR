import React from 'react'
import { useState } from 'react'
import '../../style/home/SearchBar.css'
import { allChampions } from '../../constants'
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ props }) => {
  const [input, setInput] = useState("");
  const handleInputChange = (value) => {
    setInput(value);
    //usually results should be already filtered in the backend after the fetch/axois request
    //will implement this later
    const results = allChampions.filter((champion) => {
      return (
        value &&
        champion &&
        champion.name &&
        champion.name.toLowerCase().startsWith(value.toLowerCase().trim()));
    })
    props.setSearchResults(results)
  }

  const handleSubmit = () => {
    const result = allChampions.find((champion) => {
      return (
        input &&
        champion &&
        champion.name &&
        champion.name.toLowerCase().startsWith(input.toLowerCase().trim())
      )
    })
    console.log(result)
    result ?
      alert(`Redirecting to ${result.name}'s champion page... TO BE IMPLEMENTED`) :
      alert(`Redirecting to CHAMPION NOT FOUND PAGE... TO BE IMPLEMENTED`)
  }

  return (
    <div className='input-wrapper'>
      <input 
        className='input' 
        placeholder='Search Champion...' 
        value={input} 
        onChange={(e) => {handleInputChange(e.target.value)}}
        onKeyDown={(e) => {e.key === "Enter" && handleSubmit()}}
      />
      <button
        onClick={handleSubmit}
      >
        <FaMagnifyingGlass className='w-[20px] h-[20px] mr-1.5' />
      </button>
    </div>
  )
}

export default SearchBar