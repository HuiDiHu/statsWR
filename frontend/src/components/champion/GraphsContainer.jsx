import React from 'react'
import Graph from './Graph'
import { useState, useLayoutEffect } from 'react'
import 'src/style/champion/GraphsContainer.css'

const Graphs = ({ props }) => {
    //what the fuck is this??
    const [tierData, setTierData] = useState([])
    const [wrData, setWrData] = useState([])
    const [prData, setPrData] = useState([])
    const [brData, setBrData] = useState([])

    const parseData = (label) => {
        return props.gameplayData.map((item) => (
            [item['date'], item[label]]
        ))
    }
    useLayoutEffect(() => {
        //setTierData()
        setWrData(parseData('winRate'))
        setPrData(parseData('pickRate'))
        setBrData(parseData('banRate'))
    }, [props.role, props.gameplayData])
    return (
        <div 
            className='my-10 mx-28'
        >
            <div
                className={`flex ${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
            >
                <div className={`${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'grow-transition' : 'shrink-transition'}`}></div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'justify-end' : ''}`}
                >
                    <div className={`${((props.isClicked === 0 && props.isHovered === 2) || props.isClicked === 2) ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ label: props.label, isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'RANK', id: '1', data: tierData, role: props.role }} />
                </div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'justify-end' : ''}`}
                >
                    <div className={`${((props.isClicked === 0 && props.isHovered === 1) || props.isClicked === 1) ? 'grow-transition' : 'shrink-transition'}`}></div>
                    <Graph props={{ label: props.label, isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'WINRATE', id: '2', data: wrData, role: props.role }} />
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
                    <Graph props={{ label: props.label, isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'PICKRATE', id: '3', data: prData, role: props.role }} />
                    <div className={`${((props.isClicked === 0 && props.isHovered === 4) || props.isClicked === 4) ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div
                    className={`flex flex-col ${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'justify-end' : ''}`}
                >
                    <Graph props={{ label: props.label, isClicked: props.isClicked, setIsClicked: props.setIsClicked, isHovered: props.isHovered, setIsHovered: props.setIsHovered, graphLabel: 'BANRATE', id: '4', data: brData, role: props.role }} />
                    <div className={`${((props.isClicked === 0 && props.isHovered === 3) || props.isClicked === 3) ? 'grow-transition' : 'shrink-transition'}`}></div>
                </div>
                <div className={`${((props.isClicked === 0 && props.isHovered === 2) || props.isClicked === 2) ? 'grow-transition' : 'shrink-transition'}`}></div>
            </div>
        </div>

    )
}

export default Graphs