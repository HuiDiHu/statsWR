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
                <TableRow />
            </tbody>
        </table>
    )
}

export default TableBody