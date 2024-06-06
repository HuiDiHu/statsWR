import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Champion = () => {
    const { id: championLabel } = useParams()
    const location = useLocation()
    return (
        <div>
            <Link to={location.state.retAddr}>
                {'<-- Go Back'}
            </Link>
            <h1>{`Welcome to ${championLabel}'s champion page.`}</h1>
        </div>
    )
}

export default Champion