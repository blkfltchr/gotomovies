import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const {
  RECIPES,
  ADD_RECIPE,
  SEARCH,
  SETTINGS
} = ROUTES

const NavigationAuth = () => (
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
          to={RECIPES}>
          MY RECIPES
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to={ADD_RECIPE}>
          ADD RECIPE
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to={SEARCH}>
          SEARCH
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          to={SETTINGS}>
          SETTINGS
        </Link>
      </li>
    </ul>
  </div>
)

export default NavigationAuth
