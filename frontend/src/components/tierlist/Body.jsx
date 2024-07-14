import { useMemo } from 'react'
import { useState } from 'react'
import SideSearchbar from './SideSearchbar'
import RoleSelection from './RoleSelection'
import ChampionCardsList from './ChampionCardsList'
import TierlistDropdown from './TierlistDropdown'
import TableBody from './tierlist-table/TableBody'
import { allChampions } from 'src/constants'
import logo from 'assets/logo.png'

const Body = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const roleFilteredChampions = useMemo(() => {
        return roleIndex === 0 ? allChampions : allChampions.filter((champion) => {
            return champion && champion.label && champion.role.find((element) => element === roleIndex);
        })
    }, [roleIndex]) || allChampions;

    const filteredChampions = useMemo(() => {
        return input === "" ? roleFilteredChampions : roleFilteredChampions.filter((champion) => {
            return champion && champion.label && champion.name.toLowerCase().includes(input.toLowerCase().trim());
        });
    }, [input, roleIndex]) || allChampions;

    return (
        <div className='flex'>
            <div className='flex flex-col flex-shrink-0 w-1/3 bg-[#31313c] rounded-md px-2 h-min'>
                <SideSearchbar props={{ filteredChampions, setInput }} />
                <RoleSelection props={{ roleIndex, setRoleIndex }} />
                <ChampionCardsList props={{ filteredChampions, roleIndex }} />
            </div>
            <div className={`flex flex-1 flex-col flex-shrink-0 bg-[#31313c] grow ml-2 rounded-md ${roleIndex !== 0 && 'h-min'}`}>
                <TierlistDropdown />
                <TableBody props={{ roleIndex, loading, setLoading }} />
                {loading && <div className='w-full h-32 flex flex-col items-center justify-end'>
                    <img
                        src={logo}
                        className='h-16 w-16 animate-pulse'
                    />
                    <span className='text-lg animate-pulse'> Loading... </span>
                    <span className='text-md animate-pulse text-orange-600'> May take up to 50 seconds </span>
                </div>
                }
            </div>
        </div>
    )
}

export default Body