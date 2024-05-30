import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/home/SearchBar'
import SearchResultsList from '../components/home/SearchResultsList'
import SearchIcons from '../components/home/SearchIcons'
import Footer from '../components/home/Footer'

const Home = () => {
  const [searchResults, setSearchResults] = useState([])

  return (
    <div>
      <Navbar />
      <div className='pt-20 w-1/3 h-[90vh] m-auto flex flex-col items-center min-w-[200px]'>
        <div className='h-[15vh]'></div>
        <SearchIcons />
        <SearchBar props={{setSearchResults: setSearchResults}}/>
        <SearchResultsList props={{searchResults}}/>
      </div>
      <Footer />
    </div>
  )
}

export default Home