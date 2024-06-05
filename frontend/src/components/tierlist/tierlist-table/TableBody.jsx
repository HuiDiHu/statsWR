import { useEffect, useState } from "react"
import TableRow from "./TableRow"
import axios from 'axios'

const TableBody = ({ props }) => {
    const [loading, setLoading] = useState(false)
    const [roleFilteredChampions, setRoleFilteredChampions] = useState([])
    const [focusSection, setFocusSection] = useState('winRate')

    const focusSectionStyle = "border-b-2 border-orange-700 text-orange-500";

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:5555/api/v1/champions/lanes/${props.roleIndex}`)
            .then((res) => {
                console.log('Updated filtered champion data')
                setRoleFilteredChampions(res.data.champions)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }, [props.roleIndex])

    return (
        <table className='table-auto'>
            <thead className='bg-zinc-800'>
                <tr className='text-neutral-400 text-xs h-7 text-left'>
                    <th className='font-light pl-3'><span>Rank</span></th>
                    <th className='font-light pl-1'><span>Champion</span></th>
                    <th className={`font-light pl-1 text-center ${focusSection === 'tier' && focusSectionStyle}`}>
                        <button
                            onClick={() => {
                                //TODO: sort by tier 1 or -1
                                setFocusSection('tier')
                            }}
                        >
                            <span>Tier</span>
                        </button>
                    </th>
                    <th className='font-light pl-1 text-center'><span>Position</span></th>
                    <th className={`font-light pl-1 text-center ${focusSection === 'winRate' && focusSectionStyle}`}>
                        <button
                            onClick={() => {
                                //TODO: sort by winRate 1 or -1
                                setFocusSection('winRate')
                            }}
                        >
                            <span>Win Rate</span>
                        </button>
                    </th>
                    <th className={`font-light pl-1 text-center max-sm:hidden ${focusSection === 'pickRate' && focusSectionStyle}`}>
                        <button
                            onClick={() => {
                                //TODO: sort by pickRate 1 or -1
                                setFocusSection('pickRate')
                            }}
                        >
                            <span>Pick Rate</span>
                        </button>
                    </th>
                    <th className={`font-light pl-1 text-center max-sm:hidden ${focusSection === 'banRate' && focusSectionStyle}`}>
                        <button
                            onClick={() => {
                                //TODO: sort by banRate 1 or -1
                                setFocusSection('banRate')
                            }}
                        >
                            <span>Ban Rate</span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {roleFilteredChampions.map((champion, index) => (
                    <TableRow
                        key={index}
                        props={{
                            rank: index + 1,
                            label: champion.label,
                            name: champion.name,
                            role: champion.role,
                            gameplayData: {
                                winRate: champion.gameplayData[champion.gameplayData.length - 1].winRate,
                                pickRate: champion.gameplayData[champion.gameplayData.length - 1].pickRate,
                                banRate: champion.gameplayData[champion.gameplayData.length - 1].banRate
                            },
                            tier: champion.tier,
                            focusSection: focusSection
                        }}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default TableBody