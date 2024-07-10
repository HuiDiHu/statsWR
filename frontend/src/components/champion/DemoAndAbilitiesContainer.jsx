/*
1. Video border/bg same as how we have the boxes for the graphs
2. Five different interactable ability buttons to change video and description
3. Champion ability descriptions
*/
import React, { useLayoutEffect, useState } from 'react'
import axios from 'axios'
import logo from 'assets/logo.png'

const abilitySlot = ['PASSIVE', '1ST ABILITY', '2ND ABILITY', '3RD ABILITY', 'ULTIMATE']

const DemoAndAbilitiesContainer = ({ props }) => {
  const [selectedAbility, setSelectedAbility] = useState(0)
  const [champAbilities, setChampAbilities] = useState([])
  const [demoLoaded, setDemoLoaded] = useState(false)

  useLayoutEffect(() => {
    axios
      .get(`https://statswr-api.onrender.com/api/v1/champions/abilities/${props.label}`)
      .then((res) => {
        setChampAbilities(res.data.abilities)
        props.setStatus("AOK")
      })
      .catch((error) => {
        props.setStatus("BAD_REQUEST")
        console.log(error);
      })
  }, [props.label])

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='relative flex justify-center items-center h-[230px] w-[387.5px] md:h-[307px] md:w-[517px] lg:h-[460px] lg:w-[775px] bg-[#1e1e1e] rounded-3xl mb-5'>
        {selectedAbility < champAbilities.length && props.status === "AOK" &&
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadStart={() => setDemoLoaded(false)}
            onLoadedData={() => setDemoLoaded(true)}
            key={champAbilities[selectedAbility].demoSrc}
            className='transition-opacity h-[87%] rounded-3xl'
          >
            <source src={champAbilities[selectedAbility].demoSrc} type='video/mp4' />
          </video>
        }
        {!demoLoaded && <img className="h-12 w-12 lg:h-20 lg:w-20 absolute bottom-5 right-5 lg:bottom-10 lg:right-10 animate-bounce" src={logo} />}
        {props.status === "BAD_REQUEST" &&
          <div>
            <h1 className='text-center text-4xl text-red-600'>
              ERROR CODE 400: AXIOS BAD REQUEST ERROR...
            </h1>
          </div>
        }
        <div className='absolute bottom-2 left-10 h-2 lg:h-4 w-20 lg:w-32 bg-gradient-to-r from-orange-500 to-orange-700 overflow-hidden 
                        after:h-full after:w-full after:bg-[#1e1e1e] after:absolute after:rotate-45 after:origin-bottom-right
                        before:h-full before:w-full before:bg-[#1e1e1e] before:absolute before:rotate-45 before:origin-top-left'>
        </div>
        <div className='absolute top-1.5 right-10 h-2 lg:h-4 w-20 lg:w-32 bg-gradient-to-l from-orange-500 to-orange-700 overflow-hidden 
                        after:h-full after:w-full after:bg-[#1e1e1e] after:absolute after:-rotate-45 after:origin-bottom-right
                        before:h-full before:w-full before:bg-[#1e1e1e] before:absolute before:-rotate-45 before:origin-top-left'>
        </div>
      </div>
      <div className='w-[375px] md:w-[500px] lg:w-[790px]'>
        <ul className='flex pl-5 space-x-5'>
          {champAbilities.map((ability, index) => (
            <li key={index}>
              <button
                className={`p-1 flex justify-center items-center rounded-full ${selectedAbility !== index ? 'bg-gradient-to-b from-[#d9c49a] to-[#4e432a]' : 'bg-gradient-to-b from-sky-200 to-sky-500'}`}
                onClick={() => { setSelectedAbility(index) }}
              >
                <img
                  className={`h-12 w-12 lg:h-20 lg:w-20 rounded-full ${selectedAbility !== index ? 'grayscale-[65%]' : 'grayscale-0'}`}
                  src={ability.iconSrc}
                  alt='/'
                />
              </button>
            </li>
          ))}
        </ul>
        <div className='relative mt-5 mb-10 ml-1 flex flex-col w-full rounded-lg bg-[#1e1e1e] p-3.5'>
          <div className='absolute top-1.5 right-10 h-4 w-32 bg-gradient-to-l from-orange-500 to-orange-700 overflow-hidden 
                        after:h-full after:w-full after:bg-[#1e1e1e] after:absolute after:rotate-45 after:origin-bottom-right
                        before:h-full before:w-full before:bg-[#1e1e1e] before:absolute before:rotate-45 before:origin-top-left'>
          </div>
          <div className='absolute top-1.5 right-40 h-1 w-24 lg:w-48 bg-orange-700'></div>
          <span className='mb-1 text-orange-700 font-light'>{abilitySlot[selectedAbility]}</span>
          <span className='mb-3 font-semibold text-2xl first-letter:text-3xl'>{selectedAbility < champAbilities.length && champAbilities[selectedAbility].name}</span>
          <span className='text-md text-wrap'>{selectedAbility < champAbilities.length && champAbilities[selectedAbility].description}</span>
        </div>
      </div>
    </div>
  )
}

export default DemoAndAbilitiesContainer