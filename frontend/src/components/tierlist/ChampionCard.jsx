const ChampionCard = ({ props }) => {
    const handleRedirect = (name) => {
        alert(`Redirecting to ${name}'s champion page... TO BE IMPLEMENTED`);
    }

    return (
        <div className='m-1'>
            <button onClick={() => handleRedirect(props.name)}>
                <img
                    className='h-12 w-12 bg-red-800'
                    src={props.imgSrc}
                    alt={props.imgSrcAlt}
                />
                <p className='text-neutral-400 text-xs w-12 truncate'>
                    <span>{props.name}</span>
                </p>
            </button>
        </div>
    )
}

export default ChampionCard