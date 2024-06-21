/*
1. Video border/bg same as how we have the boxes for the graphs
2. Five different interactable ability buttons to change video and description
3. Champion ability descriptions
*/
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const abilitySlot = ['PASSIVE', '1ST ABILITY', '2ND ABILITY', '3RD ABILITY', 'ULTIMATE']

const tempChampAbilities = [
  {
    iconSrc: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/bltf02de5aa154436e8/637408773177be104ac204f6/Aatrox_0.jpg',
    name: 'DEATHBRINGER STANCE',
    description: "Periodically, Aatrox's next basic attack deals bonus physical damage and heals him, based on the target's max health."
  },
  {
    iconSrc: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt8a9b72bd71cff770/637408772f1aba10d25a6996/Aatrox_1.jpg',
    name: 'THE DARKIN BLADE',
    description: "Aatrox slams his greatsword down, dealing physical damage. He can swing three times, each with a different area of effect."
  },
  {
    iconSrc: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt2647a75d08760657/6374087707d496104f38b139/Aatrox_2.jpg',
    name: 'INFERNAL CHAINS',
    description: 'Aatrox smashes the ground, dealing damage to the first enemy hit. Champions and large monsters have to leave the impact area quickly or they will be dragged to the center and take the damage again.'
  },
  {
    iconSrc: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt1dc77fc7124260bb/63740877da728110eb03aeb6/Aatrox_3.jpg',
    name: 'UMBRAL DASH',
    description: 'Passively, Aatrox heals when damaging enemy champions. On activation, he dashes in a direction.'
  },
  {
    iconSrc: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt3d3184feb4c01eca/63740877deb37610ecbb373f/Aatrox_4.jpg',
    name: 'WORLD ENDER',
    description: 'Aatrox unleashes his demonic form, fearing nearby enemy minions and gaining attack damage, increased healing, and Move Speed. If he gets a takedown, this effect is extended.'
  }
]

const DemoAndAbilitiesContainer = ({ props }) => {
  const [selectedAbility, setSelectedAbility] = useState(0)
  const [champAbilities, setChampAbilities] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:5555/api/v1/champions/abilities/${props.label}`)
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
      <div className='relative flex justify-center items-center h-[460px] w-[775px] bg-[#1e1e1e] rounded-3xl mb-5'>
        {selectedAbility < champAbilities.length && props.status === "AOK" &&
          <video
            autoPlay
            loop
            muted
            key={champAbilities[selectedAbility].demoSrc}
            className='transition-opacity h-[400px] rounded-3xl'
          >
            <source src={champAbilities[selectedAbility].demoSrc} type='video/mp4' />
            Video doesn't exist :/
          </video>
        }
        {props.status === "BAD_REQUEST" && 
          <div>
            <h1 className='text-center text-4xl text-red-600'>
              ERROR CODE 400: AXIOS BAD REQUEST ERROR...
            </h1>
          </div>
        }
        <div className='absolute bottom-2 left-10 h-4 w-32 bg-gradient-to-r from-orange-500 to-orange-700 overflow-hidden 
                        after:h-full after:w-full after:bg-[#1e1e1e] after:absolute after:rotate-45 after:origin-bottom-right
                        before:h-full before:w-full before:bg-[#1e1e1e] before:absolute before:rotate-45 before:origin-top-left'>
        </div>
        <div className='absolute top-1.5 right-10 h-4 w-32 bg-gradient-to-l from-orange-500 to-orange-700 overflow-hidden 
                        after:h-full after:w-full after:bg-[#1e1e1e] after:absolute after:-rotate-45 after:origin-bottom-right
                        before:h-full before:w-full before:bg-[#1e1e1e] before:absolute before:-rotate-45 before:origin-top-left'>
        </div>
      </div>
      <div className='w-[790px]'>
        <ul className='flex pl-5 space-x-5'>
          {champAbilities.map((ability, index) => (
            <li key={index}>
              <button
                className={`p-1 flex justify-center items-center rounded-full ${selectedAbility !== index ? 'bg-gradient-to-b from-[#d9c49a] to-[#4e432a]' : 'bg-gradient-to-b from-sky-200 to-sky-500'}`}
                onClick={() => { setSelectedAbility(index) }}
              >
                <img
                  className={`h-20 w-20 rounded-full ${selectedAbility !== index ? 'grayscale-[65%]' : 'grayscale-0'}`}
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
          <div className='absolute top-1.5 right-40 h-1 w-48 bg-orange-700'></div>
          <span className='mb-1 text-orange-700'>{abilitySlot[selectedAbility]}</span>
          <span className='mb-3 font-semibold text-2xl first-letter:text-3xl'>{selectedAbility < champAbilities.length && champAbilities[selectedAbility].name}</span>
          <span className='text-md text-wrap'>{selectedAbility < champAbilities.length && champAbilities[selectedAbility].description}</span>
        </div>
      </div>
    </div>
  )
}

export default DemoAndAbilitiesContainer