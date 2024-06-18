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
        <div>
            <Link to={location.state ? location.state.retAddr : '/'}>
                {'<-- Go Back'}
            </Link>
            <h1>{`Welcome to ${championLabel}'s champion page.`}</h1>
            {location.state ? 
            <Body props={{ label: location.state.champLabel, defaultRole: location.state.role ? location.state.role : undefined }} />
            :
            <div className='text-center text-4xl text-red-600'> SOMETHING WENT WRONG... PLEASE GO BACK</div>
            }
            <Footer />
        </div>
    )
}

export default Champion