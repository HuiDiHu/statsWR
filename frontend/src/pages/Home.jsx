import React, { useState } from 'react'
import Navbar from 'src/components/home/Navbar'
import SearchBar from 'src/components/home/SearchBar'
import SearchResultsList from 'src/components/home/SearchResultsList'
import SearchIcons from 'src/components/home/SearchIcons'
import Footer from 'src/components/Footer'

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