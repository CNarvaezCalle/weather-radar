import { useState, useEffect } from 'react'


const Header = () => {

    return(
        <>
        <div className="header__container">
          <div>       
            <h1 className='header__title'>Weather app</h1>
            <button className='header__darkmode'>luz</button>
          </div> 
            <input className='header__search' type="search" placeholder='Search your city' />
        </div>    
        </>
    )
}

export default Header