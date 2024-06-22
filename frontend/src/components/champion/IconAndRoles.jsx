import { useEffect, useState } from "react"

const roleTable = ['all', 'baron', 'jungle', 'mid', 'bottom', 'support'];

const IconButton = (n, curRole, role, handleMouseClick) => {
  return (
    <button
      key={role}
      id={role}
      onClick={handleMouseClick}
      className={`mx-2.5 flex items-center justify-center ${curRole === role && n > 1 ? 'border-2 border-orange-700' : ''} h-8 w-8 transition-all ease-in-out rounded-full bg-gradient-to-b from-[#d9c49a] to-[#4e432a]`}
    >
      <img
        className='h-6 w-6'
        src={`../../../assets/role-icons/${roleTable[role]}-role-icon.png`}
      />
    </button>
  )
}

const IconAndRoles = ({ props }) => {
  const [topContainerContent, setTopContainerContent] = useState([])
  const [midContainerContent, setMidContainerContent] = useState([])
  const [botContainerContent, setBotContainerContent] = useState([])

  useEffect(() => {
    const allRoles = props.allRoles.sort();
    let lb = 0, rb = allRoles.length - 1;
    while (rb >= lb) {
      switch (rb - lb) {
        case 4:
          setTopContainerContent([allRoles[lb], allRoles[rb]])
          break;
        case 3:
        case 2:
          setMidContainerContent([allRoles[lb], allRoles[rb]])
          break;
        case 1:
          setBotContainerContent([allRoles[lb], allRoles[rb]])
          break;
        case 0:
          setBotContainerContent([allRoles[lb]])
          break;
      }
      --rb; ++lb;
    }
  }, [props.label])

  const handleMouseClick = (e) => {
    e.stopPropagation();
    props.setCurRole(e.currentTarget.id)
  }

  return (
    <div className='relative flex flex-col items-center m-6'>
      <div className='flex items-center justify-center p-1 rounded-full bg-gradient-to-b from-[#d9c49a] to-[#4e432a]'>
        <img
          className='h-28 w-28 rounded-full'
          src={`../../../assets/champion-icons/${props.label}.png`}
          alt={`../../../assets/champion-icons/EMPTY_CHAMPION.png`}
        />
      </div>
      <div id="top-role-container" className="flex justify-between absolute top-12 w-[225px]">
        {topContainerContent.map((role) => IconButton(Number(props.allRoles.length), Number(props.curRole), role, handleMouseClick))}
      </div>
      <div id="mid-role-container" className="flex justify-between absolute top-24 w-[200px]">
        {midContainerContent.map((role) => IconButton(Number(props.allRoles.length), Number(props.curRole), role, handleMouseClick))}
      </div>
      <div id="bot-role-container" className="flex justify-center absolute top-32">
        {botContainerContent.map((role) => IconButton(Number(props.allRoles.length), Number(props.curRole), role, handleMouseClick))}
      </div>
      <br></br>
      <h1 className='mt-5 text-2xl'>{props.name || 'CHAMPION_NOT_FOUND'}</h1>
      <h3 className='text-sm font-extralight'>{props.title}</h3>
    </div>
  )
}

export default IconAndRoles