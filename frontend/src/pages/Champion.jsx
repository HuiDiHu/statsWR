import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Body from 'src/components/champion/Body'

const Champion = () => {
    const { id: championLabel } = useParams()
    const location = useLocation()
    /*
        0. Navbar?
        { Body
            1. Icon/roles
            2. Rank, tier, WR, PR, BR
            3. 4 Graphs
            4. Ability video
            5. Ability icon
            6. Ability description
        }
        7. Footer  
    */
    return (
        <div className='flex flex-col items-center'>
            <Link to={location.state.retAddr}>
                {'<-- Go Back'}
            </Link>
            <h1>{`Welcome to ${championLabel}'s champion page.`}</h1>
            <Body props={{ label: location.state.champLabel, defaultRole: location.state.role ? location.state.role : undefined }}/>
            <Footer />
        </div>
    )
}

export default Champion