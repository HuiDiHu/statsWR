import React from 'react'
import Graph from './Graph'
import { useState, useEffect } from 'react'
import 'src/style/champion/GraphsContainer.css'

const Graphs = ({ props }) => {
    //TODO: what the fuck is this??
    const parseData = (label) => {
        return props.gameplayData.map((item) => (
            [item['date'], item[label]]
        ))
    }
    return (
        <div className='py-10 px-28'>
            <div
                className={`flex ${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
            >
                <div className={`${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
                >
                    <div className={`${((props.isClicked === 0 && props.isHovered === 2) || props.isClicked === 2) ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'TIER', id: '1', data: [] }} />
                </div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'justify-end' : ''}`}
                >
                    <div className={`${((props.isClicked === 0 && props.isHovered === 1) || props.isClicked === 1) ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'WINRATE', id: '2', data: parseData('winRate') }} />
                </div>
                <div className={`${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
            <div
                className={`flex ${((props.isClicked === 0 && props.isHovered === 2) || props.isClicked === 2) ? 'justify-end' : ''}`}
            >
                <div className={`${((props.isClicked === 0 && props.isHovered === 1) || props.isClicked === 1) ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
                >
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'PICKRATE', id: '3', data: parseData('pickRate') }} />
                    <div className={`${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'justify-end' : ''}`}
                >
                    <Graph props={{ isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'BANRATE', id: '4', data: parseData('banRate') }} />
                    <div className={`${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div className={`${((props.isClicked === 0 && props.isHovered === 2) || props.isClicked === 2) ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
        </div>

    )
}

export default Graphs