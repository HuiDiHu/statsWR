const IconAndRoles = ({ props }) => {
  return (
    <div className='flex flex-col items-center m-6'>
      <div className='flex items-center justify-center p-1 rounded-full bg-gradient-to-b from-[#d9c49a] to-[#4e432a]'>
        <img
          className='h-28 w-28 rounded-full'
          src={`../../../assets/champion-icons/${props.label}.png`}
          alt={`../../../assets/champion-icons/EMPTY_CHAMPION.png`}
        />
      </div>
      <h1 className='mt-2.5 text-2xl'>{props.name || 'CHAMPION_NOT_FOUND'}</h1>
      <h3 className='text-sm'>The bruh blade</h3>
    </div>
  )
}

export default IconAndRoles