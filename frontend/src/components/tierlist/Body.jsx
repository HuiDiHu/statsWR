import { useMemo } from 'react'
import { useState } from 'react'
import SideSearchbar from './SideSearchbar'
import RoleSelection from './RoleSelection'
import ChampionCardsList from './ChampionCardsList'
import TierlistDropdown from './TierlistDropdown'
import TableBody from './tierlist-table/TableBody'
import { allChampions } from 'src/constants'

const Body = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [input, setInput] = useState("");

    const roleFilteredChampions = useMemo(() => {
        return roleIndex === 0 ? allChampions : allChampions.filter((champion) => {
            return champion && champion.label && champion.role.find((element) => element === roleIndex);
        })
    }, [roleIndex]) || allChampions;

    const filteredChampions = useMemo(() => {
        return input === "" ? roleFilteredChampions : roleFilteredChampions.filter((champion) => {
            return champion && champion.label && champion.name.toLowerCase().startsWith(input.toLowerCase().trim());
        });
    }, [input, roleIndex]) || allChampions;

    return (
        <div className='flex'>
            <div className='flex flex-col flex-shrink-0 w-1/3 bg-[#31313c] rounded-md px-2'>
                <SideSearchbar props={{ filteredChampions, setInput }} />
                <RoleSelection props={{ roleIndex, setRoleIndex }} />
                <ChampionCardsList props={{ filteredChampions }} />
            </div>
            <div className={`flex flex-1 flex-col flex-shrink-0 bg-[#31313c] grow ml-2 rounded-md ${roleIndex !== 0 && 'h-min'}`}>
                <TierlistDropdown />
                <TableBody props={{ roleIndex }} />
            </div>
        </div>
    )
}

export default Body