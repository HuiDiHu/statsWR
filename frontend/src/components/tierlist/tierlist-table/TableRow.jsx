const rolesTable = ['baron', 'jungle', 'mid', 'bottom', 'support'];

const TableRow = ({ props }) => {
    return (
        <tr className='border border-x-0 border-y-1 border-[#1e1e1e] py-1 hover:bg-zinc-800 hover:border hover:border-y-0 hover:border-r-0 hover:border-orange-700 group'>
            <td className='text-sm text-center py-2 group-hover:text-orange-500'>
                <span>{props.rank}</span>
            </td>
            <td className="py-1">
                <div className='flex items-center'>
                    <img
                        className='h-8 w-8 rounded-sm'
                        src={`assets/champion-icons/${props.label}.png`}
                        alt='assets/champion-icons/EMPTY_CHAMPION.png'
                    />
                    <span className="pl-2 text-center text-xs font-semibold group-hover:text-orange-500">{props.name}</span>
                </div>
            </td>
            <td>
                <h5 className="text-center text-lg">{props.tier}</h5>
            </td>
            <td className="py-2 flex justify-center">
                <img
                    className="h-6 w-6"
                    src={`assets/role-icons/${rolesTable[props.role - 1]}-role-icon.png`}
                />
            </td>
            <td>
                <h5 className="text-center text-sm text-neutral-400 pl-1">{props.gameplayData.winRate}%</h5>
            </td>
            <td>
                <h5 className="text-center text-sm text-neutral-400 pl-1">{props.gameplayData.pickRate}%</h5>
            </td>
            <td>
                <h5 className="text-center text-sm text-neutral-400 pl-1">{props.gameplayData.banRate}%</h5>
            </td>
        </tr>
    )
}

export default TableRow