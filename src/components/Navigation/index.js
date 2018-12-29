import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='navbar navbar-default'>
      <div className='navbar-header'>
        <button
          className='navbar-toggle'
          type='button'
          data-target='#navbarCollapse'
          data-toggle='collapse'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar' />
          <span className='icon-bar' />
          <span className='icon-bar' />
        </button>
        <Link className='navbar-brand' to='/'>Go To Recipes</Link>
      </div>
      <div id='navbarCollapse' className='collapse navbar-collapse'>
        <ul className='nav navbar-nav'>
          <li className='active'>
            <Link to='/recipes'>My recipes</Link>
          </li>
          <li>
            <Link to='/recipes/add'>Add a recipe</Link>
          </li>
          <li>
            <Link to='/search'><i className='fas fa-search' /></Link>
          </li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Link to='/'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
