import { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import IconAndRoles from './IconAndRoles'
import StatsLabel from './StatsLabel'
import GraphsContainer from './GraphsContainer'
import { allChampions } from 'src/constants'
import DemoAndAbilitiesContainer from './DemoAndAbilitiesContainer'
import { Link } from 'react-router-dom'
import logo from 'assets/logo.png'

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
      .get(`https://statswr-api.onrender.com/api/v1/champions/${props.label}`)
      .then((res) => {
        setChampionData(res.data.champion)
        props.setName(res.data.champion[0].name)
        setInfo({
          label: props.label,
          gameplayData: (curRole ? res.data.champion.find((item) => item.role === curRole).gameplayData : res.data.champion[0].gameplayData),
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
      label: props.label,
      gameplayData: data.gameplayData,
    })
  }, [curRole])

  return (
    <div
      className='relative z-0 flex justify-center'
      onClick={() => { setIsClicked(0) }}
    >
      <div
        className='relative w-full sm:w-[80%] min-h-[1000px] bg-[#31313c] rounded-lg mt-2'
        onClick={() => { setIsClicked(0) }}
      >
        <Link
          className='flex justify-center items-center h-8 w-16 rounded-lg bg-gradient-to-r from-orange-500 to-orange-800 absolute top-10 left-10 cursor-pointer'
          to={props.retAddr}
        >
          <span className='text-md'> Back</span>
        </Link>
        {loading && <div className='absolute top-24 right-24 flex flex-col items-start justify-end'>
          <img
            src={logo}
            className='h-20 w-20 animate-pulse'
          />
          <span className='text-lg animate-pulse'> Loading... </span>
          <span className='text-lg animate-pulse text-orange-600'> May take up to 50 seconds </span>

        </div>
        }
        {info && championData &&
          <div className='flex flex-col items-center'>
            <IconAndRoles props={{
              label: props.label,
              curRole,
              setCurRole,
              allRoles: championData.map((item) => item.role) || [],
              name: props.name,
              title: champTitle,
              setIsClicked
            }} />
            <StatsLabel props={info.gameplayData ?
              {
                tier: info.gameplayData[info.gameplayData.length - 1]['tier'].split(',')[0],
                rank: info.gameplayData[info.gameplayData.length - 1]['tier'].split(',')[1],
                prevRank: info.gameplayData.length > 1 ? info.gameplayData[info.gameplayData.length - 2]['tier'].split(',')[1] : info.gameplayData[info.gameplayData.length - 1]['tier'].split(',')[1],
                winRate: info.gameplayData[info.gameplayData.length - 1]['winRate'],
                prevWinRate: info.gameplayData.length > 1 ? info.gameplayData[info.gameplayData.length - 2]['winRate'] : info.gameplayData[info.gameplayData.length - 1]['winRate'],
                pickRate: info.gameplayData[info.gameplayData.length - 1]['pickRate'],
                prevPickRate: info.gameplayData.length > 1 ? info.gameplayData[info.gameplayData.length - 2]['pickRate'] : info.gameplayData[info.gameplayData.length - 1]['pickRate'],
                banRate: info.gameplayData[info.gameplayData.length - 1]['banRate'],
                prevBanRate: info.gameplayData.length > 1 ? info.gameplayData[info.gameplayData.length - 2]['banRate'] : info.gameplayData[info.gameplayData.length - 1]['banRate'],
              } :
              { tier: '', rank: 0, prevRank: 0, winRate: 0, prevWinRate: 0, pickRate: 0, prevPickRate: 0, banRate: 0, prevBanRate: 0 }
            } />
            <GraphsContainer props={{ label: props.label, isHovered, setIsHovered, isClicked, setIsClicked, gameplayData: info.gameplayData || [], role: curRole }} />
            <DemoAndAbilitiesContainer props={{ label: props.label, status, setStatus }} />
          </div>
        }
      </div>
    </div>
  )
}

export default Body