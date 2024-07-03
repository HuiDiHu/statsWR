import React, { useState } from 'react'
import Navbar from 'src/components/Navbar'
import SearchBar from 'src/components/home/SearchBar'
import SearchResultsList from 'src/components/home/SearchResultsList'
import SearchIcons from 'src/components/home/SearchIcons'
import Footer from 'src/components/Footer'
import LoginModal from 'src/components/LoginModal';
import SignupModal from 'src/components/SignupModal';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  return (
    <div>
      <Navbar props={{
        titleHidden: true,
        label: 'Home',
        loginModal, signupModal, setLoginModal, setSignupModal
      }} />
      {loginModal && <LoginModal onClose={() => setLoginModal(false)} props={{setLoginModal, setSignupModal}} />}
      {signupModal && <SignupModal onClose={() => setSignupModal(false)} props={{setLoginModal, setSignupModal}} />}
      <div className='pt-20 w-1/3 h-[90vh] m-auto flex flex-col items-center min-w-[200px]'>
        <div className='h-[15vh]'></div>
        <SearchIcons />
        <SearchBar props={{ setSearchResults: setSearchResults }} />
        <SearchResultsList props={{ searchResults }} />
      </div>
      <Footer />
    </div>
  )
}

export default Home