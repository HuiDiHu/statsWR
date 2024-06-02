const LaneCard = ({ props }) => {
    return (
        <button onClick={() => props.setRoleIndex(props.index)}>
            <div className={!props.selected ? props.style : props.selectedStyle}>
                <img className="h-6 w-6" src={props.imgSrc} />
            </div>
        </button>
    )
}

export default LaneCard