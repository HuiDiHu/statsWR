const LaneCard = ({ props }) => {
    return (
        <button onClick={() => props.setRoleIndex(props.index)}>
            <div className={!props.selected ? props.style : props.selectedStyle}>
                <img className="h-4 w-4 lg:h-6 lg:w-6" src={props.imgSrc} />
            </div>
        </button>
    )
}

export default LaneCard