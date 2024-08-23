import React, { useState } from 'react'
import Navbar from 'src/components/Navbar'
import SearchBar from 'src/components/home/SearchBar'
import SearchResultsList from 'src/components/home/SearchResultsList'
import SearchIcons from 'src/components/home/SearchIcons'
import Footer from 'src/components/Footer'
import LoginModal from 'src/components/LoginModal';
import SignupModal from 'src/components/SignupModal';
import { Analytics } from '@vercel/analytics/react';

const Home = ({ props }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  return (
    <div>
      <Navbar props={{
        titleHidden: true,
        label: 'Home',
        loginModal, signupModal, setLoginModal, setSignupModal,
        isLogged: props.isLogged,
        setLogged: props.setLogged
      }} />
      {loginModal && <LoginModal onClose={() => setLoginModal(false)} props={{ setLoginModal, setSignupModal, setLogged: props.setLogged }} />}
      {signupModal && <SignupModal onClose={() => setSignupModal(false)} props={{ setLoginModal, setSignupModal, setLogged: props.setLogged }} />}
      <div className='pt-20 w-1/3 h-[90vh] m-auto flex flex-col items-center min-w-[200px]'>
        <div className='h-[15vh]'></div>
        <SearchIcons />
        <SearchBar props={{ setSearchResults: setSearchResults }} />
        <SearchResultsList props={{ searchResults }} />
      </div>
      <Footer />
      <Analytics
        beforeSend={(event) => {
          if (event.url.includes('/private')) {
            return null;
          }
          return event;
        }}
      />
    </div>
  )
}

export default Home