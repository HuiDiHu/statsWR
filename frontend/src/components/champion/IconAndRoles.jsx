const IconAndRoles = ({ props }) => {
  return (
    <div className='flex flex-col items-center mt-18 m-6'>
      <div className='flex items-center justify-center p-0.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-800'>
        <img
          className='h-28 w-28 rounded-full'
          src={`../../../assets/champion-icons/${props.label}.png`}
          alt={`../../../assets/champion-icons/EMPTY_CHAMPION.png`}
        />
      </div>
      <h1 className='mt-2.5 text-xl'>{props.name || 'CHAMPION_NOT_FOUND'}</h1>
      <h3 className='text-sm'>The bruh blade</h3>
    </div>
  )
}

export default IconAndRoles