import React from 'react'
import { Link } from 'react-router-dom'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LOGIN,
  SIGNUP,
  SEARCH
} = ROUTES

const NavigationNonAuth = () => (
  <div
    className='collapse navbar-collapse main-menu'
    id='navbarContent'>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to='/'>
          HOME
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to={SIGNUP}>
          SIGN UP
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to={LOGIN}>
          LOG IN
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to={SEARCH}>
          SEARCH
        </Link>
      </li>
    </ul>
  </div>
)

export default NavigationNonAuth
