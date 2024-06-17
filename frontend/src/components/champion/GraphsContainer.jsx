import React from 'react'
import Graph from './Graph'
import { useState, useEffect } from 'react'
import 'src/style/champion/GraphsContainer.css'

const Graphs = ({ props }) => {
    const [isHovered, setIsHovered] = useState(0)
    useEffect

    return (
        <div id='0'>
            <div
                className={`flex ${isHovered === 4 ? 'justify-end' : ''}`}
            >
                <div className={`${isHovered === 3 ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${isHovered === 4 ? 'justify-end' : ''}`}
                >
                    <div className={`${isHovered === 2 ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ isHovered, setIsHovered, graphLabel: 'TIER', id: '1' }} />
                </div>
                <div
                    className={`flex flex-col ${isHovered === 3 ? 'justify-end' : ''}`}
                >
                    <div className={`${isHovered === 1 ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ isHovered, setIsHovered, graphLabel: 'WINRATE', id: '2' }} />
                </div>
                <div className={`${isHovered === 4 ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
            <div
                className={`flex ${isHovered === 2 ? 'justify-end' : ''}`}
            >
                <div className={`${isHovered === 1 ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${isHovered === 4 ? 'justify-end' : ''}`}
                >
                    <Graph props={{ isHovered, setIsHovered, graphLabel: 'PICKRATE', id: '3' }} />
                    <div className={`${isHovered === 4 ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div
                    className={`flex flex-col ${isHovered === 3 ? 'justify-end' : ''}`}
                >
                    <Graph props={{ isHovered, setIsHovered, graphLabel: 'BANRATE', id: '4' }} />
                    <div className={`${isHovered === 3 ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div className={`${isHovered === 2 ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
        </div>

    )
}

export default Graphs