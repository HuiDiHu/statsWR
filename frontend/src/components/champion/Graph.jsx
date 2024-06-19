const Graph = ({ props }) => {
    const graphStyle = 'cursor-pointer lg:w-[400px] lg:h-[400px] w-[150px] h-[150px] rounded-lg bg-[#1e1e1e] mx-8 ease-in duration-500 pointer-events-none'
    const selectedGraphStyle = 'cursor-pointer lg:w-[450px] lg:h-[450px] w-[175px] h-[175px] rounded-lg bg-[#1e1e1e] mx-8 ease-in duration-[400ms] shadow-[rgba(194,65,12,0.5)_12px_6px_4.8px_0px] pointer-events-none'
    const unselectedGraphStyle = 'cursor-pointer lg:w-[375px] lg:h-[375px] w-[137.5px] h-[137.5px] rounded-lg bg-[#1e1e1e] mx-4 ease-in duration-500 pointer-events-none'
    const clickedGraphStyle = 'lg:w-[600px] lg:h-[600px] w-[225px] h-[225px] rounded-xl bg-[#1e1e1e] mx-8 ease-in duration-[400ms] pointer-events-none'
    const nonclickedGraphStyle = 'cursor-pointer lg:w-[200px] lg:h-[200px] w-[100px] h-[100px] rounded-md bg-[#1e1e1e] mx-4 ease-in duration-500 pointer-events-none'

    const labelStyle = 'cursor-pointer text-xl border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'
    const selectedLabelStyle = 'cursor-pointer text-2xl border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'
    const unselectedLabelStyle = 'cursor-pointer text-md border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'
    const clickedLabelStyle = 'text-4xl border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'
    const nonclickedLabelStyle = 'cursor-pointer text-md border-2 border-y-0 border-orange-700 px-4 mb-1 ease-in duration-500 pointer-events-none'

    const handleMouseOver = (e) => {
        e.stopPropagation();
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
            }
        }, 525) //mess with the delay here
    }
    const handleMouseClick = (e) => {
        e.stopPropagation();
        switch (e.target.id) {
            case "1":
                props.setIsClicked(1)
                break
            case "2":
                props.setIsClicked(2)
                break
            case "3":
                props.setIsClicked(3)
                break
            case "4":
                props.setIsClicked(4)
                break
        }
    }

    return (
        <div
            className={`flex flex-col items-center py-4 pointer-events-auto ${props.isClicked !== Number(props.id) ? 'cursor-pointer' : 'cursor-auto'}`}
            id={props.id}
            onMouseOver={handleMouseOver}
            onMouseLeave={() => {props.setIsHovered(0)}}
            onClick={handleMouseClick}
        >
            <span
                className={
                    props.isClicked === 0 ? 
                    (props.isHovered === Number(props.id) ? selectedLabelStyle : 
                    (props.isHovered === 0 ? labelStyle : unselectedLabelStyle)) :
                    (props.isClicked === Number(props.id) ? clickedLabelStyle : nonclickedLabelStyle)
                }
            >
                {props.graphLabel}
            </span>
            <div
                className={
                    props.isClicked === 0 ?
                    (props.isHovered === Number(props.id) ? selectedGraphStyle : 
                    (props.isHovered === 0 ? graphStyle : unselectedGraphStyle)) : 
                    (props.isClicked === Number(props.id) ? clickedGraphStyle : nonclickedGraphStyle)
                }
            >
            </div>
        </div>
    )
}

export default Graph