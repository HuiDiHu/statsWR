import { useState, useEffect } from 'react'
import axios from 'axios'
import IconAndRoles from './IconAndRoles'
import StatsLabel from './StatsLabel'
import GraphsContainer from './GraphsContainer'
import DemoAndAbilitiesContainer from './DemoAndAbilitiesContainer'
import logo from 'assets/logo.png'

const Body = ({ props }) => {
  const [loading, setLoading] = useState(false)
  const [championData, setChampionData] = useState([])
  const [info, setInfo] = useState({})
  const [isClicked, setIsClicked] = useState(0)
  const [isHovered, setIsHovered] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    axios
      .get(`http://localhost:5555/api/v1/champions/${props.label}`)
      .then((res) => {
        setChampionData(res.data.champion)
        setInfo({
          name: res.data.champion[0].name,
          label: props.label,
          role: props.defaultRole ? props.defaultRole : res.data.champion[0].role,
          gameplayData: (props.defaultRole ? res.data.champion.find((item) => item.role === props.defaultRole).gameplayData : res.data.champion[0].gameplayData)[0],
          tier: props.defaultRole ? res.data.champion.find((item) => item.role === props.defaultRole).tier : res.data.champion[0].tier,
        })
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }, [props.label])
  return (
    <div 
      className='relative flex justify-center'
      onClick={() => {setIsClicked(0)}}
      onMouseOver={() => {setIsHovered(0)}}
    >
      <div className='w-[80%] min-h-[1000px] bg-[#31313c]'>
        {!loading &&
          <div className='flex flex-col items-center'>
            <IconAndRoles props={{
              label: props.label,
              defaultRole: props.defaultRole,
              name: info.name
            }} />
            <StatsLabel props={{
              tier: info.tier ? info.tier : '',
              winRate: info.gameplayData ? info.gameplayData['winRate'] : '',
              pickRate: info.gameplayData ? info.gameplayData['pickRate'] : '',
              banRate: info.gameplayData ? info.gameplayData['banRate'] : '',
              rank: '1/0',

            }} />
            <GraphsContainer props={{ isHovered, setIsHovered, isClicked, setIsClicked}}/>
            <DemoAndAbilitiesContainer props={{ label: props.label }}/>
          </div>
        }
      </div>
      <img
        className='fixed bottom-10 right-10 h-12 w-12 hover:h-14 hover:w-14 hover:bottom-9 hover:right-9 ease-in-out duration-200'
        onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
        src={logo}
        alt=''
      />
    </div>
  )
}

export default Body