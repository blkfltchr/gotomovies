import React from 'react'
import { Link } from 'react-router-dom'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  SEARCH,
  SIGNUP,
  LOGIN
} = ROUTES

const NavigationNonAuth = () => (
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
      <Link
        className='navbar-brand'
        to={LANDING}>
        Go To Recipes
      </Link>
    </div>
    <div id='navbarCollapse' className='collapse navbar-collapse'>
      <ul className='nav navbar-nav'>
        <li>
          <Link to={SEARCH}>Search for Recipes</Link>
        </li>
      </ul>
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <Link to={SIGNUP}>Sign Up</Link>
        </li>
        <li>
          <Link to={LOGIN}>Log In</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavigationNonAuth
