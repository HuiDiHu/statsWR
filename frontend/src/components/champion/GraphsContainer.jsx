import React from 'react'
import Graph from './Graph'
import { useState, useEffect } from 'react'
import 'src/style/champion/GraphsContainer.css'

const Graphs = ({ props }) => {
    const [isHovered, setIsHovered] = useState(0)
    return (
        <div className='px-10' onMouseOver={() => {setIsHovered(0)}}>
            <div
                className={`flex ${((props.isClicked === 0 && isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
            >
                <div className={`${((props.isClicked === 0 && isHovered === 3) || props.isClicked === 3) ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
                >
                    <div className={`${((props.isClicked === 0 && isHovered === 2) || props.isClicked === 2) ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered, setIsHovered, graphLabel: 'TIER', id: '1' }} />
                </div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && isHovered === 3) || props.isClicked === 3) ? 'justify-end' : ''}`}
                >
                    <div className={`${((props.isClicked === 0 && isHovered === 1) || props.isClicked === 1) ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered, setIsHovered, graphLabel: 'WINRATE', id: '2' }} />
                </div>
                <div className={`${((props.isClicked === 0 && isHovered === 4) || props.isClicked === 4) ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
            <div
                className={`flex ${((props.isClicked === 0 && isHovered === 2) || props.isClicked === 2) ? 'justify-end' : ''}`}
            >
                <div className={`${((props.isClicked === 0 && isHovered === 1) || props.isClicked === 1) ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
                >
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered, setIsHovered, graphLabel: 'PICKRATE', id: '3' }} />
                    <div className={`${((props.isClicked === 0 && isHovered === 4) || props.isClicked === 4) ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && isHovered === 3) || props.isClicked === 3) ? 'justify-end' : ''}`}
                >
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered, setIsHovered, graphLabel: 'BANRATE', id: '4' }} />
                    <div className={`${((props.isClicked === 0 && isHovered === 3) || props.isClicked === 3) ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div className={`${((props.isClicked === 0 && isHovered === 2) || props.isClicked === 2) ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
        </div>

    )
}

export default Graphs