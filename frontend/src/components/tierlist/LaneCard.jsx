import { allChampions } from "src/constants"

const LaneCard = ({ props }) => {
    const handleClick = () => {
        props.setRoleIndex(props.index)
        const result = props.index === 0 ? allChampions : allChampions.filter((champion) => {
            return champion && champion.label && champion.role.find((element) => {return element === Number(props.index)})
        })
        props.setFilteredChampions(result.filter((champion) => {
            return (
                !props.input ||
                champion && champion.name && champion.name.toLowerCase().startsWith(props.input.toLowerCase().trim())
            );
        }))
    }

    return (
        <button onClick={handleClick}>
            <div className={!props.selected ? props.style : props.selectedStyle}>
                <img className="h-6 w-6" src={props.imgSrc} />
            </div>
        </button>
    )
}

export default LaneCard