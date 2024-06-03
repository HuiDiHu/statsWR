const ChampionCard = ({ props }) => {
    const handleRedirect = (name) => {
        alert(`Redirecting to ${name}'s champion page... TO BE IMPLEMENTED`);
    }

    return (
        <div className='m-1'>
            <button onClick={() => handleRedirect(props.name)}>
                <img
                    className='h-8 w-8 lg:h-12 lg:w-12'
                    src={props.imgSrc}
                    alt={props.imgSrcAlt}
                />
                <p className='text-neutral-400 text-xs w-8 lg:w-12 truncate'>
                    <span>{props.name}</span>
                </p>
            </button>
        </div>
    )
}

export default ChampionCard