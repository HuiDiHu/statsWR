import { useState } from "react"
import TableRow from "./TableRow"

const TableBody = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <table className='table-auto'>
            <thead className='bg-zinc-800'>
                <tr className='text-neutral-400 text-xs h-7 text-left'>
                    <th className='font-light pl-3'><span>Rank</span></th>
                    <th className='font-light pl-1'><span>Champion</span></th>
                    <th className='font-light pl-1 text-center'>
                        <button>
                            <span>Tier</span>
                        </button>
                    </th>
                    <th className='font-light pl-1 text-center'><span>Position</span></th>
                    <th className='font-light pl-1 text-center'>
                        <button>
                            <span>Win Rate</span>
                        </button>
                    </th>
                    <th className='font-light pl-1 text-center'>
                        <button>
                            <span>Pick Rate</span>
                        </button>
                    </th>
                    <th className='font-light pl-1 text-center'>
                        <button>
                            <span>Ban Rate</span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <TableRow props={{
                    rank: 1,
                    label: "RIVEN",
                    name: "Riven",
                    role: 1,
                    gameplayData:{
                        winRate: 55.43,
                        pickRate: 10.12,
                        banRate: 1.69
                    },
                    tier: "A+",
                }} />
                <TableRow props={{
                    rank: 2,
                    label: "AATROX",
                    name: "Aatrox",
                    role: 1,
                    gameplayData:{
                        winRate: 52.14,
                        pickRate: 6.69,
                        banRate: 4.20
                    },
                    tier: "A",
                }} />
                <TableRow props={{
                    rank: 3,
                    label: "ANNIE",
                    name: "Annie",
                    role: 3,
                    gameplayData:{
                        winRate: 0.12,
                        pickRate: 0.00,
                        banRate: 69.42
                    },
                    tier: "F-",
                }} />
            </tbody>
        </table>
    )
}

export default TableBody