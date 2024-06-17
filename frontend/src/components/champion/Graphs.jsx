import React from 'react'

const Graphs = ({ props }) => {
    const graphStyle = 'w-[400px] h-[400px] rounded-lg bg-red-800 mx-8'
    const labelStyle = 'text-xl border-2 border-y-0 border-orange-700 px-4 mb-1'
    return (
        <div>
            <div className='flex my-8'>
                <div className='flex flex-col items-center'>
                    <span className={labelStyle}>TIER</span>
                    <div className={graphStyle}>
                        <video
                            autoPlay
                            loop
                            muted
                        >
                            <source 
                                src='https://www.wildriftfire.com/images/champions/abilities/akali-assassins-mark.webm'
                                type='video/webm'
                            />
                        </video>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <span className={labelStyle}>WINRATE</span>
                    <div className={graphStyle}></div>
                </div>
            </div>
            <div className='flex my-8'>
                <div className='flex flex-col items-center'>
                    <span className={labelStyle}>PICKRATE</span>
                    <div className={graphStyle}></div>
                </div>
                <div className='flex flex-col items-center'>
                    <span className={labelStyle}>BANRATE</span>
                    <div className={graphStyle}></div>
                </div>
            </div>
        </div>

    )
}

export default Graphs