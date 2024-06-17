const Graph = ({ props }) => {
    const graphStyle = 'w-[400px] h-[400px] rounded-lg bg-red-800 mx-8 ease-in duration-500 pointer-events-none'
    const selectedGraphStyle = 'w-[600px] h-[600px] rounded-xl bg-red-800 mx-8 ease-in duration-[400ms] pointer-events-none'
    const unselectedGraphStyle = 'w-[200px] h-[200px] rounded-md bg-red-800 mx-4 ease-in duration-500 pointer-events-none'
    const labelStyle = 'text-xl border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'
    const selectedLabelStyle = 'text-4xl border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'
    const unselectedLabelStyle = 'text-md border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'

    const handleMouseOver = (e) => {
        setTimeout(() => {
            switch (e.target.id) {
                case "1":
                    props.setIsHovered(1)
                    break
                case "2":
                    props.setIsHovered(2)
                    break
                case "3":
                    props.setIsHovered(3)
                    break
                case "4":
                    props.setIsHovered(4)
                    break
                default:
                    props.setIsHovered(4)
                    break
            }
        }, 525) //mess with the delay here
    }

    return (
        <div
            className='flex flex-col items-center py-4 pointer-events-auto'
            id={props.id}
            onMouseOver={handleMouseOver}
            onMouseOut={() => props.setIsHovered(0)}
        >
            <span
                className={props.isHovered === Number(props.id) ? selectedLabelStyle : (props.isHovered === 0 ? labelStyle : unselectedLabelStyle)}
            >
                {props.graphLabel}
            </span>
            <div
                className={props.isHovered === Number(props.id) ? selectedGraphStyle : (props.isHovered === 0 ? graphStyle : unselectedGraphStyle)}
            >
            </div>
        </div>
    )
}

export default Graph