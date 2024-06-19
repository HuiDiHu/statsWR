/*
1. Video border/bg same as how we have the boxes for the graphs
2. Five different interactable ability buttons to change video and description
3. Champion ability descriptions
*/
import React, { useEffect, useState } from 'react'

const abilitySlot = ['PASSIVE', '1ST ABILITY', '2ND ABILITY', '3RD ABILITY', 'ULTIMATE']

//TODO: these are placeholders for an import from constants...
const tempVideoSrc = [
  'https://www.wildriftfire.com/images/champions/abilities/aatrox-deathbringer-stance.webm',
  'https://www.wildriftfire.com/images/champions/abilities/aatrox-the-darkin-blade.webm',
  'https://www.wildriftfire.com/images/champions/abilities/aatrox-infernal-chains.webm',
  'https://www.wildriftfire.com/images/champions/abilities/aatrox-umbral-dash.webm',
  'https://www.wildriftfire.com/images/champions/abilities/aatrox-world-ender.webm'
]
const tempChampAbilities = [
  {
    iconSrc: '../../../assets/champion-icons/EMPTY_CHAMPION.png',
    name: 'Passive Ability Name',
    description: 'This is the tempoary passive ability description'
  },
  {
    iconSrc: '../../../assets/champion-icons/EMPTY_CHAMPION.png',
    name: '1st Ability Name',
    description: 'This is the tempoary 1st ability description'
  },
  {
    iconSrc: '../../../assets/champion-icons/EMPTY_CHAMPION.png',
    name: '2nd Ability Name',
    description: 'This is the tempoary 2nd ability description'
  },
  {
    iconSrc: '../../../assets/champion-icons/EMPTY_CHAMPION.png',
    name: '3rd Ability Name',
    description: 'This is the tempoary 3rd ability description'
  },
  {
    iconSrc: '../../../assets/champion-icons/EMPTY_CHAMPION.png',
    name: 'Ultimate Ability Name',
    description: 'This is the tempoary ultimate ability description'
  }
]

const DemoAndAbilitiesContainer = () => {
  const [selectedAbility, setSelectedAbility] = useState(0)

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-center items-center h-[460px] w-[775px] bg-[#1e1e1e] rounded-3xl mb-5'>
        <video
          autoPlay
          loop
          muted
          key={tempVideoSrc[selectedAbility]}
          className='h-[400px] rounded-3xl'
        >
          <source src={tempVideoSrc[selectedAbility]} type='video/webm' />
          Video doesn't exist :/
        </video>
      </div>
      <div className='w-[790px]'>
        <ul className='flex space-x-5'>
          {tempChampAbilities.map((ability, index) => (
            <li key={index}>
              <button
                className={`p-1 flex justify-center items-center rounded-full ${selectedAbility !== index ? 'bg-gradient-to-b from-[#d9c49a] to-[#4e432a]' : 'bg-gradient-to-b from-sky-200 to-sky-500'}`}
                onClick={() => { setSelectedAbility(index) }}
              >
                <img
                  className='h-20 w-20 rounded-full'
                  src={ability.iconSrc}
                  alt='/'
                />
              </button>
            </li>
          ))}
        </ul>
        <div className='mt-5 mb-10 ml-1 flex flex-col w-full rounded-lg bg-[#1e1e1e] p-2'>
          <span className='mb-1'>{abilitySlot[selectedAbility]}</span>
          <span className='mb-3'>{tempChampAbilities[selectedAbility].name}</span>
          <span className='text-wrap'>{tempChampAbilities[selectedAbility].description}</span>
        </div>
      </div>
    </div>
  )
}

export default DemoAndAbilitiesContainer