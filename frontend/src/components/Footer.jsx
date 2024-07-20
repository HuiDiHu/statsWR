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
                    <span>Last updated on 7/18/2024</span>
                </p>
                <p className='text-xs line-through'>
                    <span>rito pls release official wildrift API</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer