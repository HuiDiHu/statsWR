import { useNavigate } from "react-router-dom";
const ChampionCard = ({ props }) => {
    const navigate = useNavigate()
    const handleRedirect = (label) => {
        if (!label || label === 'CHAMPION NOT FOUND') {
            alert('CHAMPION NOT FOUND')
            return;
        }
        navigate(`/champion/${label}`, { state: { retAddr: '/tierlist', champLabel: label } })
    }

    return (
        <div className='m-1'>
            <button onClick={() => handleRedirect(props.label)}>
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