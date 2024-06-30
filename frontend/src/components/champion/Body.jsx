import { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import IconAndRoles from './IconAndRoles'
import StatsLabel from './StatsLabel'
import GraphsContainer from './GraphsContainer'
import { allChampions } from 'src/constants'
import DemoAndAbilitiesContainer from './DemoAndAbilitiesContainer'
import { Link } from 'react-router-dom'

const Body = ({ props }) => {
  const [loading, setLoading] = useState(false)
  const [championData, setChampionData] = useState([])
  const [info, setInfo] = useState({})
  const [isClicked, setIsClicked] = useState(0)
  const [isHovered, setIsHovered] = useState(0)
  const [curRole, setCurRole] = useState(props.defaultRole)
  const [status, setStatus] = useState("AOK")
  const [champTitle, setChampTitle] = useState("")

  useLayoutEffect(() => {
    setLoading(true)
    window.scrollTo(0, 0)
    setChampTitle(allChampions.find((item) => item.label === props.label).title)
    axios
      .get(`http://localhost:5555/api/v1/champions/${props.label}`)
      .then((res) => {
        setChampionData(res.data.champion)
        setInfo({
          name: res.data.champion[0].name,
          label: props.label,
          gameplayData: (curRole ? res.data.champion.find((item) => item.role === curRole).gameplayData : res.data.champion[0].gameplayData),
          tier: curRole ? res.data.champion.find((item) => item.role === curRole).tier : res.data.champion[0].tier,
        })
        setCurRole(curRole ? curRole : res.data.champion[0].role)
        setStatus("AOK")
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        setStatus("BAD_REQUEST")
        console.log(error)
      })
  }, [props.label])

  useLayoutEffect(() => {
    const data = championData.find((item) => item.role === Number(curRole));
    if (!data) {
      return;
    }
    setInfo({
      name: data.name,
      label: props.label,
      gameplayData: data.gameplayData,
      tier: data.tier
    })
  }, [curRole])
  return (
    <div 
      className='relative z-0 flex justify-center'
      onClick={() => {setIsClicked(0)}}
      onMouseOver={() => {setIsHovered(0)}}
    >
      <div className='relative w-[80%] min-h-[1000px] bg-[#31313c] rounded-lg mt-2'>
        <Link 
          className='flex justify-center items-center h-8 w-16 rounded-lg bg-gradient-to-r from-orange-500 to-orange-800 absolute top-10 left-10'
          to={props.retAddr}
        >
          <span className='text-md'> Back</span>
        </Link>
        {!loading &&
          <div className='flex flex-col items-center'>
            <IconAndRoles props={{
              label: props.label,
              curRole,
              setCurRole,
              allRoles: championData.map((item) => item.role) || [],
              name: info.name,
              title: champTitle
            }} />
            <StatsLabel props={{
              tier: info.tier ? info.tier : '',
              winRate: info.gameplayData ? info.gameplayData[info.gameplayData.length - 1]['winRate'] : '',
              pickRate: info.gameplayData ? info.gameplayData[info.gameplayData.length - 1]['pickRate'] : '',
              banRate: info.gameplayData ? info.gameplayData[info.gameplayData.length - 1]['banRate'] : '',
              rank: '1/0',

            }} />
            <GraphsContainer props={{ isHovered, setIsHovered, isClicked, setIsClicked}}/>
            <DemoAndAbilitiesContainer props={{ label: props.label, status, setStatus }}/>
          </div>
        }
      </div>
    </div>
  )
}

export default Body