import React from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className='landing'>
         <div className='landing_h1'>
             <h1>Welcome to my Recipe's Food page</h1>
         </div>
         <Link to='/Home'>
             <button className='landing_button'>Ingresar</button>
         </Link>
        </div>
    )
}
        

export default LandingPage