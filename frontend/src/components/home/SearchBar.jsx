import React from 'react'
import { useState } from 'react'
import 'src/style/home/SearchBar.css'
import { allChampions } from 'src/constants'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ props }) => {
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const handleInputChange = (value) => {
    setInput(value);
    //usually results should be already filtered in the backend after the fetch/axois request
    //will implement this later
    const results = allChampions.filter((champion) => {
      return (
        value &&
        champion &&
        champion.name &&
        champion.name.toLowerCase().includes(value.toLowerCase().trim())
      );
    })
    props.setSearchResults(results)
  }

  const handleSubmit = () => {
    const result = allChampions.find((champion) => {
      return (
        input &&
        champion &&
        champion.name &&
        champion.name.toLowerCase().includes(input.toLowerCase().trim())
      )
    })
    result ? handleRedirect(result.label) : handleRedirect("CHAMPION NOT FOUND");
  }

  const handleRedirect = (label) => {
    if (!label || label === 'CHAMPION NOT FOUND') {
      alert('CHAMPION NOT FOUND')
      return
    }
    navigate(`/champion/${label}`, { state: { retAddr: '/' } })
  }

  return (
    <div className='input-wrapper'>
      <input
        className='input'
        placeholder='Search Champion...'
        value={input}
        onChange={(e) => { handleInputChange(e.target.value) }}
        onKeyDown={(e) => { e.key === "Enter" && handleSubmit() }}
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