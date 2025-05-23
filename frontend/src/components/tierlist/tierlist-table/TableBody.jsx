import { useEffect, useState } from "react"
import TableRow from "./TableRow"
import axios from 'axios'

const defaultSection = 'tier';

const TableBody = ({ props }) => {
    const [allFilteredChampions, setAllFilteredChampions] = useState([])
    const [roleFilteredChampions, setRoleFilteredChampions] = useState([])
    const [focusSection, setFocusSection] = useState(defaultSection)
    const [isDecreasing, setIsDecreasing] = useState(1)

    const focusSectionStyle = `${isDecreasing === 1 ? 'border-b-orange-700' : 'border-t-orange-700'} text-orange-500`;

    useEffect(() => {
        setFocusSection(defaultSection)
        setIsDecreasing(1)
        if (allFilteredChampions === undefined || allFilteredChampions.length == 0) {
            props.setLoading(true)
            axios
                .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/champions/lanes/0`)
                .then((res) => {
                    setAllFilteredChampions(res.data.champions)
                    setRoleFilteredChampions(
                        props.roleIndex == 0 ? 
                            res.data.champions :
                            res.data.champions.filter(champion => champion.role === props.roleIndex)
                    )
                    props.setLoading(false)
                })
                .catch((error) => {
                    props.setLoading(false)
                    console.log(error)
                })
        } else {
            setRoleFilteredChampions(
                props.roleIndex == 0 ? 
                    allFilteredChampions :
                    allFilteredChampions.filter(champion => champion.role === props.roleIndex)
            )
        }
    }, [props.roleIndex])

    //sort roleFilteredChampions by its section and whether isDecreasing is 1 or -1
    const handleFilter = async (section) => {
        const newIsDecreasing = focusSection === section ? -isDecreasing : 1;
        setIsDecreasing(newIsDecreasing)
        setFocusSection(section)
        if (section === 'tier') section = 'weight'
        setRoleFilteredChampions([...roleFilteredChampions].sort((a, b) => {
            return newIsDecreasing * (Number(b.gameplayData[b.gameplayData.length - 1][section]) -
                Number(a.gameplayData[a.gameplayData.length - 1][section]))
        }))
    }
    return (
        <table className='w-full'>
            <thead className='bg-zinc-800'>
                <tr className='text-neutral-400 text-xs h-7 text-left'>
                    <th className='font-light pl-2 lg:pl-3 border-y-2 border-y-zinc-800 w-[15%] lg:w-[8%]'><span>Rank</span></th>
                    <th className='font-light pl-1 border-y-2 border-y-zinc-800 w-[30%] lg:w-[25%]'><span>Champion</span></th>
                    <th className={`font-light pl-1 text-center border-y-2 border-y-zinc-800 w-[12%] lg:w-[10%] ${focusSection === 'tier' ? focusSectionStyle : undefined}`}>
                        <button
                            className='w-full'
                            onClick={() => {
                                handleFilter('tier')
                                setFocusSection('tier')
                            }}
                        >
                            <span>Tier</span>
                        </button>
                    </th>
                    <th className='font-light pl-1 text-center border-y-2 border-y-zinc-800'><span>Position</span></th>
                    <th className={`font-light pl-1 text-center border-y-2 border-y-zinc-800 w-[10%] lg:w-auto ${focusSection === 'winRate' ? focusSectionStyle : undefined}`}>
                        <button
                            className='w-full'
                            onClick={() => {
                                handleFilter('winRate')
                                setFocusSection('winRate')
                            }}
                        >
                            <span>Win Rate</span>
                        </button>
                    </th>
                    <th className={`font-light pl-1 text-center max-md:hidden border-y-2 border-y-zinc-800 ${focusSection === 'pickRate' ? focusSectionStyle : undefined}`}>
                        <button
                            className='w-full'
                            onClick={() => {
                                handleFilter('pickRate')
                                setFocusSection('pickRate')
                            }}
                        >
                            <span>Pick Rate</span>
                        </button>
                    </th>
                    <th className={`font-light pl-1 text-center max-md:hidden border-y-2 border-y-zinc-800 ${focusSection === 'banRate' ? focusSectionStyle : undefined}`}>
                        <button
                            className='w-full'
                            onClick={() => {
                                handleFilter('banRate')
                                setFocusSection('banRate')
                            }}
                        >
                            <span>Ban Rate</span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody className={props.loading && props.roleIndex === 0 ? 'hidden' : undefined}>
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
                            tier: champion.gameplayData[champion.gameplayData.length - 1].tier.split(',')[0],
                            focusSection: focusSection
                        }}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default TableBody