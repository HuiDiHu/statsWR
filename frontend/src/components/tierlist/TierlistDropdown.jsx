import { regionRankPatch } from 'src/constants'

const TierlistDropdown = () => {
    return (
        <ul className='flex flex-wrap md:justify-center md:space-x-6 lg:space-x-12 mx-2 lg:mx-5'>
            {regionRankPatch.map((item, index) =>
                <li key={index}>
                    <div className='flex border border-neutral-500 hover:bg-neutral-800 rounded-md justify-center items-center mt-2 mb-3 mx-3 mr-4 md:mx-0 md:mr-0'>
                        <div className='flex items-center my-2 mx-3'>
                            <img className={item.imgSrc === "/" ? "hidden" : "h-4 w-4 lg:h-6 lg:w-6"} src={item.imgSrc} />
                            <div className='flex h-4 lg:h-6 items-center'>
                                <h5 className='text-center text-xs lg:text-sm ml-1'>
                                    <span className='text-center'>{item.label}</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default TierlistDropdown