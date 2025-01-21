import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="z-0 mt-20 border-t pt-5 pb-10 border-neutral-700 px-10">
            <div className='flex flex-col items-center'>
                <p className='text-xs'>
                    <span>All data sourced from RIOT's official Wild Rift{" "}</span>
                    <Link to={"https://lolm.qq.com/act/a20220818raider/index.html"}>
                        <span className='underline text-sky-700'>
                            CN Dia+ Statistics
                        </span>
                    </Link>
                </p>
                <p className='text-xs'>
                    <span>All champion ability info and demo sourced from {" "}</span>
                    <Link to={"https://wildrift.leagueoflegends.com/en-us/champions"}>
                        <span className='underline text-sky-700'>
                            Riot's official website
                        </span>
                    </Link>
                </p>
                <p className='text-xs'>
                    <span>Last updated on 01/21/2025</span>
                </p>
                <p className='text-xs line-through'>
                    <span>rito pls release official wildrift API</span>
                </p>
                <p className='text-xs text-center'>
                    <span>statsWR isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
