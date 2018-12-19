import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar navbar-expand-sm navbar-light bg-white'>
      <Link to='/'>GoToRecipes</Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        {/* <span className='navbar-toggler-icon'></span> */}
      </button>
      <div className='collapse navbar-collapse justify-content-end' id='navbarNavAltMarkup'>
        <div className='navbar'>
          <Link className='nav-item nav-link active' to='/recipes'>My recipes</Link>
          <Link className='nav-item nav-link active' to='/recipes/add'>Add a recipe</Link>
          <Link className='nav-item nav-link active' to='/search'><i className='fas fa-search' /></Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar
