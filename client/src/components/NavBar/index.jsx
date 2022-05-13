import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import "./NavBar.css";

function NavBar() {
    function handleCLick(e){
        window.location.reload();
    }
    return (
        <div className='navbar'>
       <div>
           <Link to = '/recipe'>
               <button className='navbar_button1'>Crear Receta</button>
           </Link>
       </div>
       <div>
        <button
        className='navbar_button2' 
        onClick={(e) => {handleCLick(e)}}
        >
              Recargar Recetas
        </button>
        
       </div>   
       <div className='navbar_searchbar'>
           <SearchBar/>
       </div>     
        </div>

    )
}

export default NavBar